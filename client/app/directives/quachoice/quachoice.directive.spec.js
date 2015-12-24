'use strict';

describe('Directive: quachoice', function () {

  // load the directive's module and view
  beforeEach(module('modiPicsApp'));
  beforeEach(module('app/directives/quachoice/quachoice.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<quachoice></quachoice>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the quachoice directive');
  }));
});