'use strict';

/**
 * @ngdoc overview
 * @name notYourAverageGruntApp
 * @description
 * # notYourAverageGruntApp
 *
 * Main module of the application.
 */
angular
  .module('notYourAverageGruntApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/homework', {
        templateUrl: 'views/homework.html',
        controller: 'HomeworkCtrl',
        controllerAs: 'homework'
      })
      .when('/assignments', {
        templateUrl: 'views/assignments.html',
        controller: 'AssignmentsCtrl',
        controllerAs: 'assignments'
      })
      .when('/assignment1', {
        templateUrl: 'views/assignment1.html',
        controller: 'Assignment1Ctrl',
        controllerAs: 'assignment1'
      })
      .when('/assignment1', {
        templateUrl: 'views/assignment1.html',
        controller: 'Assignment1Ctrl',
        controllerAs: 'assignment1'
      })
      .when('/assignment2', {
        templateUrl: 'views/assignment2.html',
        controller: 'Assignment2Ctrl',
        controllerAs: 'assignment2'
      })
      .when('/assignment3', {
        templateUrl: 'views/assignment3.html',
        controller: 'Assignment3Ctrl',
        controllerAs: 'assignment3'
      })
      .when('/assignment4', {
        templateUrl: 'views/assignment4.html',
        controller: 'Assignment4Ctrl',
        controllerAs: 'assignment4'
      })
      .when('/assignment5', {
        templateUrl: 'views/assignment5.html',
        controller: 'Assignment5Ctrl',
        controllerAs: 'assignment5'
      })
      .when('/assignment6', {
        templateUrl: 'views/assignment6.html',
        controller: 'Assignment6Ctrl',
        controllerAs: 'assignment6'
      })
      .when('/assignment7', {
        templateUrl: 'views/assignment7.html',
        controller: 'Assignment7Ctrl',
        controllerAs: 'assignment7'
      })
      .when('/assignment8', {
        templateUrl: 'views/assignment8.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
