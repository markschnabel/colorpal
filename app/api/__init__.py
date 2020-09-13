from flask import Blueprint
from flask_restful import Api

api_blueprint = Blueprint('api_v1', __name__, url_prefix='/api')
api = Api(api_blueprint)

from .palette import Palette

api.add_resource(Palette, '/palette')
