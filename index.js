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
    app.ask('We got your city.' + app.data.city + '. Where would you like to go?')
  }


  function destinationIntent(app){
    let destCity = app.getArgument('destCity')
 	app.data.destCity = destCity;
	/*
	var options = { method: 'GET',
  	url: 'http://localhost:5000/api/set_locations',
  	qs: { 'current-location': app.data.city, destination: app.data.destCity },
  	headers:
   	{ 'postman-token': 'fa089c19-27a4-b526-0cd8-87c1a30e932f',
     	'cache-control': 'no-cache' } };

	request(options, function (error, response, body) {
	});*/
    app.ask('So you\'d like to go from ' + app.data.city + ' to ' +  app.data.destCity  + '. When would you like to go there?')
  }

  function leaveTime(app){
	  let goTime = app.getArgument('goTime');
	  app.data.rawGoTimeMoment = goTime;
	  app.data.goHour = moment(app.data.goTime).utc().hours()
	  app.data.goDay = moment(app.data.goTime).utc().date()
	  app.data.goMonth = parseInt(moment(app.data.goTime).local().month().toString()) + 1
	  app.data.goYear = moment(app.data.goTime).local().year()
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
	  	var options = { method: 'GET',
	    	url: 'http://localhost:5000/api/set_timeframe',
	    	qs:
	     	{ 'start-time-year': app.data.goYear,
	       	'start-time-month': app.data.goMonth,
	       	'start-time-day': app.data.goDay,
	       	'start-time-hour': app.data.goHour,
	       	'end-time-year': app.data.comeYear,
	       	'end-time-month': app.data.comeMonth,
	       	'end-time-day': app.data.comeDay,
	       	'end-time-hour': app.data.comeHour },
	    		headers:
	     	{ 'postman-token': '39ee65e8-653f-3aa2-b45a-14d462e042b7',
	       'cache-control': 'no-cache' } };

	  	 request(options, function (error, response, body) {
	  	});
	  	*/
	  app.ask('Please type in your email.');
  }

	function getEmail(app){
		let email = app.getArgument('email')
		app.data.email = email
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
		app.ask("Would you like to go by plane or car or would you like to look at both options?")
	}
	function getPlaneOrCar(app){
		let choice = app.getArgument('choice')
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
