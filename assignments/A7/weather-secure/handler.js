'use strict';

var dynamoHelper = require("../lib/DynamoHelper");

module.exports.handler = function (event, context, cb) {
  dynamoHelper.getAverageTemperature(cb);
};