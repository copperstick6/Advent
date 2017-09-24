from flask import jsonify, redirect
from urllib.parse import urlencode

import keys
import requests

previous_url = None
current_ngrok_url = 'http://ee895040.ngrok.io'

yelp_access_token = None
foursquare_access_token = None

# uses yelp's api to get list of businesses
def get_businesses(destination, search_term):
    if (yelp_access_token == None):
        get_yelp_access_token()
    headers = {'Authorization': '{0} {1}'.format("Bearer", yelp_access_token)}
    url = "https://api.yelp.com/v3/businesses/search?location={0}&term={1}".format(destination,search_term)
    response = requests.get(url, headers=headers)
    return response

# uses foursquare's venue api to get a list of attractions
def explore_attractions(destination):
    #if (foursquare_access_token == None):
    #    global previous_url
    #    previous_url = _previous_url
    #    return get_foursquare_token()
    #else:
        url = "https://api.foursquare.com/v2/venues/explore?near={0}&v={1}&client_id={2}&client_secret={3}".format(destination, "20170923", keys.get_foursquare_key(), keys.get_foursquare_secret())
        response = requests.get(url)
        return response

# uses foursquare's venue id to find the appropriate image for attraction
def get_attraction_photo(venue_id):
    url = "https://api.foursquare.com/v2/venues/{0}/photos?client_id={1}&client_secret={2}&limit=2&v={3}&group=venue".format(venue_id, keys.get_foursquare_key(), keys.get_foursquare_secret(), "20170923")
    response = requests.get(url)
    print(response)
    print(response.json())
    return response

# Foursquare authentication process (oauth2)

def get_foursquare_token():
    foursquare_redirect_url = current_ngrok_url + "/api/foursquare/redirect"
    url = "https://foursquare.com/oauth2/authenticate?client_id={0}&response_type=code&redirect_uri={1}".format(keys.get_foursquare_key(), foursquare_redirect_url)
    return redirect(url, code=302)

def store_foursquare_access_token(code):
    global foursquare_access_token
    url = "https://foursquare.com/oauth2/access_token?client_id={0}&client_secret={1}&grant_type=authorization_code&redirect_uri={2}&code={3}".format(keys.get_foursquare_key(), keys.get_foursquare_secret(), current_ngrok_url+"/api/foursquare/redirect", code)
    response = requests.get(url)
    foursquare_access_token = response.json()["access_token"]
    return redirect(previous_url)

# Yelp oauth authentication process (oauth1)
def get_yelp_access_token():
    global yelp_access_token
    url = "https://api.yelp.com/oauth2/token"
    request = urlencode({
        'grant_type': "client_credentials",
        'client_id': keys.get_yelp_key(),
        'client_secret': keys.get_yelp_secret()
    })
    headers = {
        'content-type': 'application/x-www-form-urlencoded',
    }
    response = requests.post(url, data=request, headers=headers)
    yelp_access_token = response.json()['access_token']
