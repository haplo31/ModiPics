'use strict';

describe('Controller: QqpropCtrl', function () {

  // load the controller's module
  beforeEach(module('modiPicsApp'));

  var QqpropCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QqpropCtrl = $controller('QqpropCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
