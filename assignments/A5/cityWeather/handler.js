'use strict';

var aws = require('aws-sdk');
var request = require('request');

module.exports.handler = function(event, context, cb) {


  request.get("http://api.openweathermap.org/data/2.5/weather?q=" + event.City + "&appid=ea4dd97a55fefeb38dcd3364cbacfd74", function (error, data) {
    if (error) {
      return cb(error);
    }
    else {
      var response = JSON.parse(data.body);
      return cb(null, {
        "City" : response.name,
        "Weather" : response.weather[0].main,
        "Temperature" : response.main.temp });
    }
  });
};