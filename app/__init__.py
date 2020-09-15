from flask import Flask

def create_app():
    app = Flask(__name__, static_folder='./client/build', static_url_path='/')

    @app.route('/')
    def index():
        return app.send_static_file('index.html')

    # Make sure all blueprints are imported AFTER the app has been created
    from .api import api_blueprint
    app.register_blueprint(api_blueprint)

    return app
