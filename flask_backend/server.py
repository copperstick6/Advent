from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from urllib.parse import urlencode
import keys
import requests
import urllib

app = Flask(__name__)

YELP = "https://api.yelp.com"
YELP_OAUTH = "oauth2/token"

access_token = None
token_type = "Bearer" 

current_location = None
destination = None

@app.route("/")
def hello(name=None):
    return render_template('index.html', name=name)

@app.route("/api/yelp/get_businesses")
def getFood():
    if (access_token == None):
        getToken()
    headers = {'Authorization': '{0} {1}'.format(token_type, access_token)}
    url = "https://api.yelp.com/v3/businesses/search?location={0}".format(destination)
    response = requests.get(url, headers=headers)
    return jsonify(response.json())

def getToken():
    global access_token
    url = YELP + '/' + YELP_OAUTH
    request = urlencode({
        'grant_type': "client_credentials",
        'client_id': keys.get_yelp_key(),
        'client_secret': keys.get_yelp_secret()
    })
    headers = {
        'content-type': 'application/x-www-form-urlencoded',
    }
    response = requests.post(url, data=request, headers=headers)
    access_token = response.json()['access_token']

@app.route("/api/set_locations")
def set_locations():
    global current_location, destination
    current_location = request.args.get("current-location")
    destination = request.args.get("destination")
    return ('', 200)

@app.route("/api/set_timeframe")
def set_timeframe():
    global start_time_year, start_time_month, start_time_day, start_time_hour
    global end_time_year, end_time_month, end_time_day, end_time_hour
    
    start_time_year = request.args.get("start-time-year")
    start_time_month = request.args.get("start-time-month")
    start_time_day = request.args.get("start-time-day")
    start_time_hour = request.args.get("start-time-hour")

    end_time_year = request.args.get("end-time-year")
    end_time_month = request.args.get("end-time-month")
    end_time_day = request.args.get("end-time-day")
    end_time_hour = request.args.get("end-time-hour")
    
    return ('', 200)


