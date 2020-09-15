from flask import Flask, send_from_directory
import os

def create_app():
    app = Flask(__name__, static_folder='./client/build')

    # Make sure all blueprints are imported AFTER the app has been created
    from .api import api_blueprint
    app.register_blueprint(api_blueprint)

    # Register this route last - it's a catch all route that points to the client app
    # and other routes need to be registered earlier to take precedence
    @app.route('/', defaults={ 'path': '' })
    @app.route('/<path:path>')
    def index(path):
        if path != "" and os.path.exists(f"{app.static_folder}/{path}"):
            return send_from_directory(app.static_folder, path)

        return app.send_static_file('index.html')

    return app
