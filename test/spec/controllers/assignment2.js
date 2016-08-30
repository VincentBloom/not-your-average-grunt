'use strict';

describe('Controller: Assignment2Ctrl', function () {

  // load the controller's module
  beforeEach(module('notYourAverageGruntApp'));

  var Assignment2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Assignment2Ctrl = $controller('Assignment2Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(Assignment2Ctrl.awesomeThings.length).toBe(3);
  });
});
