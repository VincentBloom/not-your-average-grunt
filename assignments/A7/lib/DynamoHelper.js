'use strict';

var aws = require("aws-sdk");
var uuid =  require("uuid");
var groupArray = require("group-array");

var docClient = new aws.DynamoDB.DocumentClient({
    region: 'us-east-1'
});

function saveWeather (city, temp, callback) {
    var params = {
        TableName: "dance",
        Item: {
            id: uuid.v1(),
            City: city,
            Temp: temp
        }
    };

    docClient.put(params, function (error, data) {
        if (error) {
            return callback(error);
        } else {
            return callback(null, data);
        }

    });
}

/* Following code created with:
    Alonso:
    Brandon:
*/

function getAverageTemperature (callback) {

    var params = {
        TableName: "dance",
        ExclusiveStartKey:null,
        ProjectionExpression: "City, #Temp",
        ExpressionAttributeNames: {
            "#Temp": "Temp"
        }
    };

    recursiveScan([], params, function (error, data) {
        console.log("Done recursion.");
        if (error) {
            callback(error);
        } else {
            callback(null, data);
        }
    });
}


function recursiveScan (array, params, callback) {

    docClient.scan(params, function (error, data) {
        if (error) {
            callback(error);
        } else {
            if (data.IsTruncated) {
                for(var j = 0; j < data.Items.length; j++) {
                    array.push(data.Items[j]);
                }
                console.log(array.length);
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                recursiveScan(array, params, callback);
            } else {
                if (array.length == 0){
                    for(var i = 0; i < data.Items.length; i++) {
                        array.push(data.Items[i]);
                    }
                }

                var result = {};
                var count = {};
                var sum = {};
                console.log(array);

                array.forEach(function (value) {
                    if (sum[value.City]) {
                        sum[value.City] += value.Temp;
                        count[value.City] += 1;
                    }
                    else {
                        sum[value.City] = value.Temp;
                        count[value.City] = 1;
                    }
                });

                for (var index in sum) {
                    result[index] = sum[index] / count[index];
                }

                callback(null, result);
            }
        }
    });
}


module.exports.saveWeather = saveWeather;
module.exports.getAverageTemperature = getAverageTemperature;