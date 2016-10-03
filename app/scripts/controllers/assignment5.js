'use strict';

/**
 * @ngdoc function
 * @name notYourAverageGruntApp.controller:Assignment5Ctrl
 * @description
 * # Assignment5Ctrl
 * Controller of the notYourAverageGruntApp
 */




angular.module('notYourAverageGruntApp')
  .controller('Assignment5Ctrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.getCities = function () {
      $scope.cities = $scope.cities.replace(/\W/g, '');
      var cities = $scope.cities.split(',');
      /* TODO: Fetch cities here! */

    };
  });
