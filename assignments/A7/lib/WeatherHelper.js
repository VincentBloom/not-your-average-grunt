var aws = require('aws-sdk');
var lambda = new aws.Lambda( {
    region: 'us-east-1'
});
var request = require('request');
var async = require('async');

var dynamoHelper = require("./DynamoHelper");

function getWeather (city, callback) {
    request.get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ea4dd97a55fefeb38dcd3364cbacfd74",
        function (error, data) {

        if (error) {
            console.log(error);
            return callback(error);
        }
        else {
            var response = JSON.parse(data.body);
            var message = { "City" : response.name,
                "Weather" : response.weather[0].main,
                "Temperature" : response.main.temp };
            dynamoHelper.saveWeather(message.City, message.Temperature, function (error, data) {
                if (error) {
                    console.log(error);
                    return callback(error);
                } else {
                    return callback(null, message);
                }
            });
        }
    });
}

function getWeatherMultiple (cities, callback) {
    var asyncTasks = [];
    var responses = [];
    for (var i = 0; i < cities.length; i++) {
        var params = {
            FunctionName: 'arn:aws:lambda:us-east-1:292274580527:function:sls-weather-cityWeather',
            InvocationType: 'RequestResponse',
            LogType: 'Tail',
            Payload: JSON.stringify({ "City" : cities[i] })
        };

        asyncTasks.push( function(callback) {
            lambda.invoke(params, function(error, data) {
                if (error) {
                    return callback(error);
                } else {
                    var response = JSON.parse(data.Payload);
                    responses.push(response);
                    callback();
                }
            })}
        );

    }

    async.parallel(asyncTasks, function () {
        console.log(responses);
        callback(null, responses);
    });
}

module.exports.getWeather = getWeather;
module.exports.getWeatherMultiple = getWeatherMultiple;