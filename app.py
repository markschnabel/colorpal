from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import numpy as np 
import cv2 
import urllib
from palette import preprocess, generate_palettes 

app = Flask(__name__) 
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

ALLOWED_EXTENSIONS = set(['jpg', 'jpeg', 'png'])


def validate_extension(filename):
    """Helper function for validating that the file provided by the user is 
    actually an image file with one of the extensions
    """
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/get_palettes/upload', methods=["POST"])
def get_palettes_from_upload():
    """Route for generating color palettes via direct upload."""
    if not request.files:
        return make_response(jsonify({'error': 'File required.'}), 400)
        
    if 'image' not in request.files:
        return make_response(jsonify({'error': 'No image was provided'}), 400)

    image = request.files['image']

    if not validate_extension(image.filename):
        return make_response(jsonify(
            {'error': 'It seems the image you\'ve submitted is invalid. Please make sure the image uses on of the following extensions .jpg, jpeg or .png.'}), 
            400
        )

    try:
        # Try to pre-process the image, if this succeeds the rest of the palette
        # generation should go smoothly since it will only be working with properly
        # formatted numpy arrays, if not the entire process will fail.
        image = preprocess(image)
    except:
        return make_response(
            jsonify({"error": "The uploaded image could not be read."}), 
            400
        )

    palettes = generate_palettes(image)

    return make_response(jsonify(palettes), 200)


@app.route('/api/get_palettes/url', methods=['POST'])
def get_palettes_from_url():
    """Route for generating color palettes provided a direct link to an image."""
    if not request.get_json():
        return make_response(jsonify({'error': 'JSON data required.'}), 400)

    if 'url' not in request.get_json():
        return make_response(jsonify({'error': 'No URL was provided.'}), 400)
    
    url = request.get_json()['url']

    if not validate_extension(url):
        return make_response(jsonify(
            {'error': 'It seems the URL you\'ve submitted is invalid. Please make '
            + 'sure it leads directly to an image and ends in either: .jpg, jpeg or .png.'}), 
            400
        )

    try:
        image = urllib.request.urlopen(url)
    except:
        return make_response(
            jsonify({"error": "Could not retrieve the image from the provided URL. "
            + "The server hosting it may not allow external requests. Please try again."}), 
            400
        )

    try:
        # Try to pre-process the image, if this succeeds the rest of the palette
        # generation should go smoothly since it will only be working with properly
        # formatted numpy arrays, if not the entire process will fail.
        image = preprocess(image)
    except:
        return make_response(
            jsonify({"error": "The image retrieved from the URL could not be read."}), 
            400
        )

    palettes = generate_palettes(image)

    return make_response(jsonify(palettes), 200)

if __name__ == '__main__':
    app.run(debug=True)