'use strict';

describe('Controller: DesignersignupCtrl', function () {

  // load the controller's module
  beforeEach(module('modiPicsApp'));

  var DesignersignupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DesignersignupCtrl = $controller('DesignersignupCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
