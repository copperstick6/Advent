from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from flask import redirect
from datetime import date
from datetime import timedelta
from urllib.parse import urlencode
# my classes
import keys
import explore
import model
import emailer 
import travel

# other classes
import requests
import json
import urllib

app = Flask(__name__)

# default values

number_of_flights_returned = 3
number_of_businesses_returned = 3
number_of_attractions_returned = 3


# a setter to set the destination
@app.route("/api/set_destination")
def set_destination():
    destination = request.args.get("destination")
    model.set_destination(destination)
    return ('', 200)

# a setter to set the departure location
@app.route("/api/set_current_location")
def set_current_location():
    current_location = request.args.get("current_location")
    model.set_starting_location(current_location)
    return('', 200)

# a setter to set the travel option (car or plane)
@app.route("/api/set_travel_option")
def set_travel_option():
    travel_option = request.args.get("option")
    model.set_travel_option(travel_option)
    return ('', 200)

# a setter to set the email receipient of itinerary
@app.route("/api/set_email")
def set_email():
    email = request.args.get("email")
    model.set_email(email)
    return('', 200)

# a setter to set the expected departure time
@app.route("/api/set_departure_time")
def set_departure_time():
    year = request.args.get("year")
    month = request.args.get("month")
    day = request.args.get("day")
    hour = request.args.get("hour")
    model.set_start_time(year, month, day, hour)
    return ('', 200)

# a setter to set the expected return time
@app.route("/api/set_return_time")
def set_return_time():
    year = request.args.get("year")
    month = request.args.get("month")
    day = request.args.get("day")
    hour = request.args.get("hour")
    model.set_end_time(year, month, day, hour)
    return ('', 200)

# a setter to set number of adult and children passengers
@app.route("/api/set_number_of_passengers")
def set_number_of_passengers():
    global number_of_adults, number_of_children
    number_of_adults = request.args.get("adults")
    number_of_children = request.args.get("children")
    number_of_adults = int(number_of_adults) if (number_of_adults != None) else 0
    number_of_children = int(number_of_children) if (number_of_children != None) else 0
    model.set_passengers(number_of_adults, number_of_children)
    return ('', 200)

@app.route("/api/send_email")
def send_email():
    emailer.generate_email(model.get_destination(), model.get_start_location())
    return('', 200)

@app.route("/api/get_flight")
def get_flight():
    number = number_of_flights_returned
    result = []
    for i in range(number):
        result.append(emailer.get_flight(i))
    return result

@app.route("/api/get_start_date")
def get_start_date():
    result = model.get_start_date()
    return json.dumps({'result' : result})

@app.route("/api/get_data")
def get_data():
    days = calculate_days()
    start_year, start_month, start_day, start_hour = model.get_start_time()
    start_date = date(int(start_year), int(start_month), int(start_day))
    print(days)
    flights = get_flight()
    result = []
    for i in range(1, days):
        result.append(generate_day(start_date+timedelta(days=i)))
    return json.dumps({'flights': flights, 'result':result}, cls=SetEncoder)

def generate_day(date):
    breakfast = get_breakfast_businesses()
    attraction1 = get_attraction()
    lunch = get_lunch_businesses()
    attraction2 = get_attraction()
    dinner = get_dinner_businesses()
    result = {   
        "date": str(date), 
        "breakfast": breakfast['results'],
        "attraction1": attraction1['results'],
        "lunch": lunch['results'],
        "attraction2": attraction2['results'],
        "dinner": dinner['results'],
    }
    return result

def get_attraction():
    number = number_of_attractions_returned
    result = []
    for i in range(number):
        result.append(emailer.pop_attraction())
    return {'results' : result}

def get_breakfast_businesses():
    number = number_of_businesses_returned
    result = []
    for i in range(number):
        result.append(emailer.pop_breakfast())
    return {'results': result}

def get_lunch_businesses():
    number = number_of_businesses_returned
    result = []
    for i in range(number):
        result.append({"business": emailer.pop_lunch()})
    return {'results': result}

def get_dinner_businesses():
    number = number_of_businesses_returned
    result = []
    for i in range(number):
        result.append({"business": emailer.pop_dinner()})
    return {'results': result}

def calculate_days():
    start_year, start_month, start_day, start_hour = model.get_start_time()
    end_year, end_month, end_day, end_hour = model.get_end_time()
    date_format = "%m/%d/%Y"
    start_date = date(int(start_year), int(start_month), int(start_day))
    end_date = date(int(end_year), int(end_month), int(end_day))
    delta = end_date - start_date
    return delta.days

def redirect_foursquare():
    code = request.args.get("code")
    explore.store_foursquare_access_token(code)

class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self,obj)
