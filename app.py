from flask import Flask, request, jsonify, make_response
from werkzeug.utils import secure_filename
import uuid
import os
import time

ALLOWED_EXTENSIONS = set(['jpg', 'jpeg', 'png'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.abspath(os.path.dirname(__file__)) + '\images'

def is_valid_image(filename):
    """Helper function for validating the file uploaded by the user to ensure
    the it actually is an image file with one of the extensions in ALLOWED_EXTENSIONS
    """
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/generate_pallete', methods=["POST"])
def generate_pallete():
    """Route for generating color palettes given an image file."""
    if 'image' not in request.files:
        return make_response(
            jsonify({'error': '"image" not provided'}), 
            404
        )

    image = request.files['image']

    if image.filename == '':
        return make_response(
            jsonify({'error': 'filename cannot be empty'}), 
            404
        )

    if not is_valid_image(image.filename):
        return make_response(
            jsonify({'error': 'image must have of extension: .jpeg, .jpg, or .png'}), 
            404
        )

    filename = str(uuid.uuid4().hex) + secure_filename(image.filename)
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    return jsonify({'uploads': 'working'})


if __name__ == '__main__':
    app.run(debug=True)