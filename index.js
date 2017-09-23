'use strict';

const ApiAiApp = require('actions-on-google').ApiAiApp

const WELCOME_INTENT = 'input.welcome'; //this is the name rom the API.AI intent. check the API.AI event console.
const LOCATION_INTENT = 'input.loc';
const DEST_INTENT = 'input.dest';

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
    app.ask('So you\'d like to go from ' + app.data.city + ' to ' +  app.data.destCity  + '. When would you like to go there?')
  }





  let actionMap = new Map();
  actionMap.set(DEST_INTENT, destinationIntent)
  actionMap.set(LOCATION_INTENT, locationIntent)
  actionMap.set(WELCOME_INTENT, welcomeIntent)
  app.handleRequest(actionMap);
}
