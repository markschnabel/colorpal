from flask import Flask, request, jsonify, make_response
from werkzeug.utils import secure_filename
import requests
import uuid
import os
import time
from palette import generate_palette

ALLOWED_EXTENSIONS = set(['jpg', 'jpeg', 'png'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.abspath(os.path.dirname(__file__)) + '\images'

def is_valid_image(filename):
    """Helper function for validating the file uploaded by the user to ensure
    the it actually is an image file with one of the extensions in ALLOWED_EXTENSIONS
    """
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/generate_palette/upload', methods=["POST"])
def generate_palette_from_upload():
    print('rout hit')
    """Route for generating color palettes given an image file."""
    if 'image' not in request.files:
        return make_response(jsonify({'error': '"image" not provided'}), 400)

    image = request.files['image']

    if image.filename == '':
        return make_response(
            jsonify({'error': 'filename cannot be empty'}), 
            400
        )

    if not is_valid_image(image.filename):
        return make_response(
            jsonify({'error': 'image must have of extension: .jpeg, .jpg, or .png'}), 
            400
        )

    filename = str(uuid.uuid4().hex) + secure_filename(image.filename)
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    image.save(image_path)
    color_palette = generate_palette(image_path)
    os.remove(image_path)
    
    if 'error' in color_palette:
        return make_response(jsonify({'error': color_palette['error']}), 400)

    return jsonify({"color_palette": color_palette})


if __name__ == '__main__':
    app.run(debug=True)