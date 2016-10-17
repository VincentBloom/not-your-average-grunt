'use strict';

/**
 * @ngdoc function
 * @name notYourAverageGruntApp.controller:Assignment7Ctrl
 * @description
 * # Assignment7Ctrl
 * Controller of the notYourAverageGruntApp
 */
angular.module('notYourAverageGruntApp')
  .controller('Assignment7Ctrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.putCities = function () {
      var cities = $scope.citiesBox.split(",");
      $http.put("https://mpa30v71ed.execute-api.us-east-1.amazonaws.com/dev/weather-multiple", cities)
        .success(function (data) {
          alert("Success!");
        })
        .error(function (error) {
          alert("Error!");
        })
    };

    $scope.getCities = function () {
      var resource = "https://mpa30v71ed.execute-api.us-east-1.amazonaws.com/dev/weather-secure";
      var headers = {
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": localStorage.getItem("token")
        }
      };

      $http.put(resource, null, headers)
        .success(function (data) {
          console.log(data);
          $scope.cities = data;
        })
        .error(function (error) {
          alert(error);
        });

    };

    $scope.login = function (isValid) {
      var url = "https://mpa30v71ed.execute-api.us-east-1.amazonaws.com/dev/login";

      var credentials = {
        "username": "invalid",
        "password": "moo"
      };

      credentials.username = isValid ? "cow": "invalid";

      $http.post(url, credentials)
        .success(function(data) {
          if (data.token) {
            $scope.isValid = "Signet in!";
            localStorage.setItem("token", data.token);
          } else {
            $scope.isValid = "Invalid credentials!";
            localStorage.removeItem("token");
          }

        })
        .error(function (error) {
          $scope.isValid = "There appears to have been an error...";
        });
      };

  });
