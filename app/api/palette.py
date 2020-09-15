from flask_restful import Resource, abort
from flask_restful.reqparse import RequestParser
from werkzeug.datastructures import FileStorage

from ..lib.palette_extractor import PaletteExtractor

class Palette(Resource):
    def __init__(self):
        self.__parser = RequestParser()
        self.__extractor = PaletteExtractor()

    def post(self):
        self.__parser.add_argument('image', type=FileStorage, location='files', required=True)

        args = self.__parser.parse_args()

        try:
            palette = self.__extractor.extract(args['image'])

            return { 'palette': palette }
        except:
            abort(422, message='The uploaded image could not be processed')
