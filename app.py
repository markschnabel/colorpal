from flask import Flask, request, jsonify, make_response
import numpy as np 
import cv2 
from palette import preprocess, extract_palette 

app = Flask(__name__) 

ALLOWED_EXTENSIONS = set(['jpg', 'jpeg', 'png'])

def validate_extension(filename):
    """Helper function for validating that the file provided by the user is 
    actually an image file with one of the extensions
    """
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/generate_palettes/upload', methods=["POST"])
def generate_palettes_from_upload():
    """Route for generating color palettes via direct upload."""   

    # Validate the uploaded file:
    if not request.files:
        return make_response(jsonify({'error': 'File required.'}), 400)
    if 'image' not in request.files:
        return make_response(jsonify({'error': 'Image field was not provided'}), 400)
    
    image = request.files['image']

    if not validate_extension(image.filename):
        return make_response(jsonify(
            {'error': 'It seems the image you\'ve submitted is invalid. Please make ' 
            + 'sure the image uses on of the following extensions .jpg, jpeg or .png.'}), 
            400
        )

    try:
        # Try to pre-process the image, if this succeeds the input was valid and
        # the result can be directly passed to the generate_palette function 
        # since it will only be working with properly formatted numpy arrays from 
        # here on. If it fails the input was not valid.
        preprocessed_image = preprocess(image)
    except:
        return make_response(
            jsonify(
                {"error": "The uploaded image could not be read."}), 
                400
            )

    color_palette = extract_palette(preprocessed_image)

    return make_response(jsonify(color_palette), 200)

if __name__ == '__main__': 
    app.run(debug=True)