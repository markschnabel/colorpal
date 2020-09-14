from flask_restful import Resource
from flask_restful.reqparse import RequestParser
from werkzeug.datastructures import FileStorage

from ..modules.palette_extractor import PaletteExtractor

class Palette(Resource):
    def __init__(self):
        self.__parser = RequestParser()
        self.__extractor = PaletteExtractor()

    def post(self):
        self.__parser.add_argument('image', type=FileStorage, location='files')

        args = self.__parser.parse_args()

        palette = self.__extractor.extract(args['image'])

        return { 'palette': palette }
