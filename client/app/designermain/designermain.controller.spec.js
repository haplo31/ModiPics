'use strict';

describe('Controller: DesignermainCtrl', function () {

  // load the controller's module
  beforeEach(module('modiPicsApp'));

  var DesignermainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DesignermainCtrl = $controller('DesignermainCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
