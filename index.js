'use strict';

const ApiAiApp = require('actions-on-google').ApiAiApp

const WELCOME_INTENT = 'input.welcome'; //this is the name rom the API.AI intent. check the API.AI event console.
const LOCATION_INTENT = 'input.loc';
const DEST_INTENT = 'input.dest';
const GO_TIME_INTENT = 'input.go'
const GET_BACK_TIME_INTENT = 'input.comeback'
const FOOD_INTENT = 'input.food'
var moment = require('moment');
var request = require('request');
exports.ricetrav = (req, res) => {
  const app = new ApiAiApp({ request: req, response: res});
  function welcomeIntent(app){
    app.ask('Welcome to HackRice. We\'ll help you find some fun and cheap places to go. Please say your current city to continue.')
  }

  function locationIntent(app){
    let city = app.getArgument('city')
	app.data.city = city;
    app.ask('We got your city.' + app.data.city + '. Where would you like to go today?')
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
	  app.ask('What category of food do you like to eat? Say any if you don\'t have a preference. We\'ll handle your events.');
  }

  function getFood(app){
	  let food = app.getArgument('food')
	  app.data.food = food
	  //TODO API request
	  app.ask('We\'ve handled your food, we just need your email address to send you your new itinerary.');
  }

  let actionMap = new Map();
  actionMap.set(FOOD_INTENT, getFood)
  actionMap.set(GET_BACK_TIME_INTENT, comeBack);
  actionMap.set(GO_TIME_INTENT, leaveTime)
  actionMap.set(DEST_INTENT, destinationIntent)
  actionMap.set(LOCATION_INTENT, locationIntent)
  actionMap.set(WELCOME_INTENT, welcomeIntent)
  app.handleRequest(actionMap);
}
