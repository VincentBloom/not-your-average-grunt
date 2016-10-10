'use strict';
var request = require("request");

function gitHubPush(message, callback) {

    console.log(message);
    var options = {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        url: "https://hooks.slack.com/services/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",
        body: JSON.stringify({
            "username": "🐄🐄🐄🐄🐄",
            "icon_emoji": ":cow:",
            "text": message
        })
    };
    request.post(options, function (error, response, data) {
        if (error) {
            callback(error);
        } else {
            callback(null, data);
        }
    });
}

function sendSlackMessage(username, message, callback) {
    console.log(message);
    var options = {
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        url: "https://hooks.slack.com/services/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",
        body: JSON.stringify({
            "username": "Website visitor! " + username,
            "icon_emoji": ":poop:",
            "text": message
        })
    };
    request.post(options, function (error, response, data) {
        if (error) {
            callback(error);
        } else {
            callback(null, data);
        }
    });
}

module.exports.gitHubPush = gitHubPush;
module.exports.sendSlackMessage = sendSlackMessage;