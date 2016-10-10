'use strict';

/**
 * @ngdoc function
 * @name notYourAverageGruntApp.controller:Assignment6Ctrl
 * @description
 * # Assignment6Ctrl
 * Controller of the notYourAverageGruntApp
 */
angular.module('notYourAverageGruntApp')
  .controller('Assignment6Ctrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.sendMessage = function () {
      var resource = "https://mpa30v71ed.execute-api.us-east-1.amazonaws.com/dev/slack-message";
      var message = {
        "username" : $scope.alias,
        "message": $scope.message
      };

      var headers = {
        "X-Api-Key" : "cCOf6V9xji6QOD0pj81rtwa2ZW00misGF2GDaX85w",
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Request-Headers" : ["Accept", "Content-Type"],
        "Access-Control-Request-Method" : ["OPTIONS", "POST"]
      };

      $http.post(resource, message, headers)
        .success(function(data) {
          $scope.response = data;
        })
        .error(function (data, status, headers) {
          $scope.response = "Error! Check your console for more information. If CORS error, I tried working it out," +
            "but I could not seem to get the headers right.     Status: " + status + " Headers: " + headers;
        }


      );
    };

  });
