'use strict';

describe('Controller: Assignment1Ctrl', function () {

  // load the controller's module
  beforeEach(module('notYourAverageGruntApp'));

  var Assignment1Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Assignment1Ctrl = $controller('Assignment1Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(Assignment1Ctrl.awesomeThings.length).toBe(3);
  });
});
