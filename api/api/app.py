import os

from eve import Eve

from .generateID import generateID

SETTINGS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'settings.py')

app = Eve(settings=SETTINGS_PATH)

app.on_insert += generateID
