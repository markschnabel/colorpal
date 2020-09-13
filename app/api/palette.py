from flask_restful import Resource

class Palette(Resource):
  @staticmethod
  def get():
    return { 'hi': 1 }
