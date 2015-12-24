'use strict';

angular.module('modiPicsApp')
  .directive('quachoice', function () {
    return {
      templateUrl: 'app/directives/quachoice/quachoice.html',
      restrict: 'EA',
      scope: {
            quamodel: '=',
            isDisabled: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });