'use strict';

var weatherHelper = require("../lib/WeatherHelper");

module.exports.handler = function(event, context, cb) {

  for (var i = 0; i < event.length; i++) {
    console.log(event[i]);
    weatherHelper.getWeather(event[i], function (error, data) {
      if (error) {
        cb(error);
      } else {
        console.log(data);
      }
    });

  }
};