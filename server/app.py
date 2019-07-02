# server.py
from flask import Flask, render_template, request
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps
import random
import os


app = Flask(__name__, static_folder="../client/build/static", template_folder="../client/build")
CORS(app)

@app.route("/")
def index():
    return render_template("index.html")   

@app.route("/allevents")
def allevents():
    return get_events()

@app.route("/events/<brand>")
def events(brand):
    return get_events(brand)

def get_events(brand = ''):
    events = []
    client = MongoClient(os.environ.get('DB'))
    db=client['bike-demo']
    events_db = db['events']
    if brand == '':
        cursor = events_db.find({}).sort("date", 1)
    else:
        cursor = events_db.find({'brand': brand}).sort("date", 1)
    for event in cursor:
        events.append(event)
    return dumps(events)

if __name__ == "__main__":
    app.run()