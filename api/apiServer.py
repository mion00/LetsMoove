import os

from api import app

if __name__ == "__main__":
    debug = False
    if os.environ.get("DEVELOPMENT"):
        debug = True
    app.run(debug=debug, host='127.0.0.1', port=8001)
