from eve import Eve

app = Eve(__name__)

if __name__ == '__main__':
    app.run(port=8001,debug=True)

