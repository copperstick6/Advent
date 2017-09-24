'use strict';

const ApiAiApp = require('actions-on-google').ApiAiApp

var moment = require('moment');
var request = require('request');
const WELCOME_INTENT = 'input.welcome'; //this is the name rom the API.AI intent. check the API.AI event console.
const LOCATION_INTENT = 'input.loc';
const DEST_INTENT = 'input.dest';
const GO_TIME_INTENT = 'input.go'
const GET_BACK_TIME_INTENT = 'input.comeback'
const GET_EMAIL = 'input.email'
const GET_PARENT_KID = 'input.people'
const NO_TRAVEL_NEEDED = 'input.doneNoArrangement'
const GET_PEOPLE_NUMBER = 'input.peopleNum'
const GET_PLANE_OR_CAR = 'input.planeCar'
exports.ricetrav = (req, res) => {
  const app = new ApiAiApp({ request: req, response: res});
  function welcomeIntent(app){
    app.ask('Welcome to HackRice. We\'ll help you find some fun and cheap places to go. Please say your current city to continue.')
  }

  function locationIntent(app){
    let city = app.getArgument('city')
	app.data.city = city;
	//127.0.0.1:5000/api/set_current_location?current_location="Houston"
	/*
	var request = require("request");

var options = { method: 'GET',
  url: 'http://127.0.0.1:5000/api/set_current_location',
  qs: { current_location: '"Houston"' },
  headers:
   { 'postman-token': 'c4740545-7ffb-04db-db5a-c3602afca037',
     'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
*/
    app.ask('We got your city.' + app.data.city + '. Where would you like to go?')
  }


  function destinationIntent(app){
    let destCity = app.getArgument('destCity')
 	app.data.destCity = destCity;
	//127.0.0.1:5000/api/set_destination?destination="Austin"
	/*var request = require("request");

var options = { method: 'GET',
  url: 'http://127.0.0.1:5000/api/set_destination',
  qs: { destination: '"Austin"' },
  headers:
   { 'postman-token': '13f3741e-f365-c952-4c48-555dcfb1552f',
     'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

*/
    app.ask('So you\'d like to go from ' + app.data.city + ' to ' +  app.data.destCity  + '. When would you like to go there?')
  }

  function leaveTime(app){
	  let goTime = app.getArgument('goTime');
	  app.data.rawGoTimeMoment = goTime;
	  app.data.goHour = moment(app.data.goTime).utc().hours()
	  app.data.goDay = moment(app.data.goTime).utc().date()
	  app.data.goMonth = parseInt(moment(app.data.goTime).local().month().toString()) + 1
	  app.data.goYear = moment(app.data.goTime).local().year()
	  /*
	  var request = require("request");

var options = { method: 'GET',
  url: 'http://127.0.0.1:5000/api/set_departure_time',
  qs: { year: '2017', month: '09', day: '25', hour: '12' },
  headers:
   { 'postman-token': 'd5bccb80-28c6-b79e-2481-9faa3478f5dd',
     'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

*/
	  app.ask('Cool, when would you like to get back?');
  }
  function comeBack(app){
	  let comeBack = app.getArgument('comeBack')
	  app.data.rawComeBackMoment = comeBack;
	  app.data.comeHour = moment(app.data.comeBack).utc().hours()
	  app.data.comeDay = moment(app.data.comeBack).utc().date()
	  app.data.comeMonth = parseInt(moment(app.data.comeBack).local().month().toString()) + 1
	  app.data.comeYear = moment(app.data.comeBack).local().year()
	  /*
	  var request = require("request");

var options = { method: 'GET',
  url: 'http://127.0.0.1:5000/api/set_return_time',
  qs: { year: '2017', month: '09', day: '28', hour: '12' },
  headers:
   { 'postman-token': 'aa5e1b78-1f81-add8-b00a-67eab134ad46',
     'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

*/
	  app.ask('Please type in your email.');
  }

	function getEmail(app){
		let email = app.getArgument('email')
		app.data.email = email
		/*
		var request = require("request");

var options = { method: 'GET',
  url: 'http://localhost:5000/api/set_email',
  qs: { email: 'davidzchen@utexas.edu' },
  headers:
   { 'postman-token': '9c83b51d-e437-67bc-497a-1f7bc4d2dd98',
     'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
*/
		app.ask("Great! Do you need travel accomodations or would you like for us to arrange them?")
	}

	function needArrangement(app){
		app.ask("Sounds good. How many Children (Eighteen or below) and adults will be going on this trip?")
	}

	function peopleNum(app){
		let kids = app.getArgument('kids')
		let adults = app.getArgument('adults')
		app.data.kids = kids
		app.data.adults = adults
		/*
		var request = require("request");

var options = { method: 'GET',
  url: 'http://localhost:5000/api/set_number_of_passengers',
  qs: { adults: '2', children: '1' },
  headers:
   { 'postman-token': '91045d48-20a9-5bb3-9dcc-ef6919385e18',
     'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
*/
		app.ask("Would you like to go by plane or car or would you like to look at both options?")
	}
	function getPlaneOrCar(app){
		let choice = app.getArgument('choice')
		app.data.choice = choice
		/*
		var request = require("request");

var options = { method: 'GET',
  url: 'http://localhost:5000/api/set_travel_option',
  qs: { option: 'Plane' },
  headers:
   { 'postman-token': '3807ed1f-aa45-d275-d5f2-7ee73111409c',
     'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
*/
		app.tell("Cool, we've got your details. Check your email for a full trip itinerary for you trip from " + app.data.city + " to " + app.data.destCity + ". Have a good time!")
	}
	function noArrangement(app){
		app.tell("Cool, we've got your details. Check your email for a full trip itinerary for you trip from " + app.data.city + " to " + app.data.destCity + ". Have a good time!")
	}

  let actionMap = new Map();
  actionMap.set(GET_PLANE_OR_CAR, getPlaneOrCar)
  actionMap.set(GET_PEOPLE_NUMBER, peopleNum)
  actionMap.set(NO_TRAVEL_NEEDED, noArrangement)
  actionMap.set(GET_PARENT_KID, needArrangement)
  actionMap.set(GET_EMAIL, getEmail)
  actionMap.set(GET_BACK_TIME_INTENT, comeBack);
  actionMap.set(GO_TIME_INTENT, leaveTime)
  actionMap.set(DEST_INTENT, destinationIntent)
  actionMap.set(LOCATION_INTENT, locationIntent)
  actionMap.set(WELCOME_INTENT, welcomeIntent)
  app.handleRequest(actionMap);
}
