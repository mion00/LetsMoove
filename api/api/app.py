import os

from eve import Eve
from flask import Blueprint

from .generateID import generateID

SETTINGS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'settings.py')

app = Eve(settings=SETTINGS_PATH)

app.on_insert += generateID

frontend = Blueprint('frontend', __name__, static_url_path='', static_folder='static')


@frontend.route('/', defaults={'page': 'index.html'})
@frontend.route('/<page>')
def index(page):
    return frontend.send_static_file(page)


app.register_blueprint(frontend)
# @app.route('/')
# def index():
#     return send_from_directory("./static", 'a.css')
