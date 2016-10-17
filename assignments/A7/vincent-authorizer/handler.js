'use strict';

var jwt = require("jsonwebtoken");

module.exports.handler = function(event, context, cb) {

  var policy = {
    "principalId": "arn:aws:iam::717454164754:user/jax.jaquez@gmail.com",
    "policyDocument": {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Deny",
          "Action": [
            "execute-api:Invoke",
            "lambda:Invoke"
          ],
          "Resource": [
            "*"
          ]
        }
      ]
    }
  };

  jwt.verify(event.authorizationToken, "$m12ia4!90!#98&", function (error, result) {

    if (error) {
      console.log(error);
      return cb(null, policy);
    }
    console.log(result);
    if (result.username === "cow") {
      policy.policyDocument.Statement[0].Effect = "Allow"
    }

    return cb(null, policy);

  });
};
