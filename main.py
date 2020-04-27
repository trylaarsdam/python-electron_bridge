from __future__ import print_function
import time
from flask import Flask
from flask import render_template
from flask import request
from flask import send_from_directory

app = Flask(__name__, static_url_path='/')
buttonTestArray = ["button1", "button2", "button3"]

@app.route("/", defaults={'inputData' : 'not specified'})
@app.route("/<inputData>")
def hello(inputData):
    print("python-started rendering")
    with app.app_context():
        rendered = render_template('index_template.html', \
            title = "My Generated Page", \
            people = [{"name": "Mark"}, {"name": "Michael"}, {"name": inputData}], \
            buttonClicked = inputData, \
            buttonArray = [{"name": "button1"}, {"name": "button2"}, {"name": "button3"}])
        return rendered

@app.route("/test1")
def test1():
    return "blank"

@app.route('/js/<path:path>')
def send_js(path):
    print(path)
    return send_from_directory('js', path)

@app.route("/<buttonID>/buttonClicked")
def buttonClicked(buttonID):
    print("python button click recieved")
    return buttonID + " returned from python" #does whatever needs to be done


if __name__ == "__main__":
    print('oh hello')
    #time.sleep(5)
    app.run(host='127.0.0.1', port=5000)