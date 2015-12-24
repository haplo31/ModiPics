'use strict';

describe('Controller: UsersignupCtrl', function () {

  // load the controller's module
  beforeEach(module('modiPicsApp'));

  var UsersignupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsersignupCtrl = $controller('UsersignupCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
