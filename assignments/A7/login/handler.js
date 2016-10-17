'use strict';

var jwt = require("jsonwebtoken");

module.exports.handler = function(event, context, cb) {

  if (event.username === "cow") {
    var result = {
      "username": event.username,
      "permissions": {
        "weather-secure": true
      }
    };

    var token = jwt.sign(result, "$m12ia4!90!#98&");
    cb(null, {"token": token});

  } else {
    cb("Invalid credentials.");
  }
};
