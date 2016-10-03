'use strict';

var aws = require('aws-sdk');
var lambda = new aws.Lambda( {
  region: 'us-east-1'
});
var async = require('async');

module.exports.handler = function(event, context, cb) {
  var asyncTasks = [];
  var responses = [];

  event.forEach(function (city) {
    console.log(city);
    asyncTasks.push(function (callback) {
      var params = {
        FunctionName: 'arn:aws:lambda:us-east-1:292274580527:function:sls-weather-cityWeather',
        Payload: JSON.stringify({ "City" : city })
      };

      lambda.invoke(params, function(error, data) {
        if (error) {
          callback(error);
        } else {
          var response = JSON.parse(data.Payload);
          responses.push(response);
          callback(null, response);
        }
      });
    });
  });

  async.parallel(asyncTasks, function (error) {
    if (error) {
      cb(null);
    } else {
      cb(null, responses);
    }
  });
};