from flask import jsonify

import model
import requests
import keys
import json

# uses google's place api to find the closest airports to a location
def find_closest_airports(location):
    latitude, longitude = get_geocode_from_name(location)
    url = "https://maps.googleapis.com/maps/api/place/textsearch/json?key={0}&location={1},{2}&radius=120&query={3}".format(keys.get_google_places_key(), latitude, longitude, "airport near " + location)
    response = requests.get(url)
    return response

# uses google's geocode api to convert a name into latitude and longitude
def get_geocode_from_name(destination):
    url = "https://maps.googleapis.com/maps/api/geocode/json?key={0}&address={1}".format(keys.get_google_places_key(), destination)
    response = requests.get(url)
    location = response.json()["results"][0]["geometry"]["location"]
    return (location["lat"], location["lng"])

# uses google's flight api to get the best airplane tickets
def find_best_airplanes(origin, destination):
    origin_iata = get_iata(origin)
    destination_iata = get_iata(destination)
    url = "https://www.googleapis.com/qpxExpress/v1/trips/search?key={0}".format(keys.get_google_places_key())
    start_time_year, start_time_month, start_time_day, start_time_hour = model.get_start_time()
    end_time_year, end_time_month, end_time_day, end_time_hour = model.get_end_time()
    data = {
        "request": {
            "passengers": {
                "adultCount": model.get_number_of_adults(),
                "childCount": model.get_number_of_children(),
            },
            "slice": [
                {
                    "origin": origin_iata,
                    "destination": destination_iata,
                    "date": "{0}-{1}-{2}".format(start_time_year, start_time_month, start_time_day)
                },
                {
                    "origin": destination_iata,
                    "destination": origin_iata,
                    "date": "{0}-{1}-{2}".format(end_time_year, end_time_month, end_time_day)
                }
            ]
        }
    }
    header = {"Content-Type": "application/json"}
    response = requests.post(url, data=json.dumps(data), headers=header)
    return response.json()["trips"]["tripOption"]

# uses meteoblue's api to get a iata code from an airport name
def get_iata(query):
    url = "https://www.meteoblue.com/en/server/search/query3?query={0}".format(query)
    response = requests.get(url)
    results = response.json()["results"]
    if (len(results) > 0):
        return results[0]["iata"]
    else:
        return None


