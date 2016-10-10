'use strict';

var slack = require("../lib/SlackHelper");

module.exports.handler = function(event, context, cb) {
  console.log(event);
  var notification = "This was a test. \nLove,\nVincent";

  if (event.Records[0].Sns.Message !== 0) {
    var response = JSON.parse(event.Records[0].Sns.Message);
    console.log(response.head_commit);
    var message = response.head_commit.message;
    var name = response.sender.login;
    var name_url = response.sender.html_url;
    var repository = response.repository.full_name;
    var repository_url = response.repository.html_url;
    notification = "<" + name_url + "|" + name + "> pushed to <" + repository_url + "|" + repository + ">!\nCommit message:\n" + message;
  }

  slack.gitHubPush(notification, function(error, data) {
    if (error) {
      return cb(error);
    } else {
      return cb(null, data);
    }
  });
};