'use strict';

var slack = require("../lib/SlackHelper");

module.exports.handler = function(event, context, cb) {
  console.log(event);

  if (event.message) {
    console.log(event.message);
  }

  slack.sendSlackMessage(event.username, event.message, function(error, data) {
    if (error) {
      return cb(error);
    } else {
      return cb(null, data);
    }
  });
};
