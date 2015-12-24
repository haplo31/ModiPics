'use strict';

angular.module('modiPicsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/designersignup', {
        templateUrl: 'app/designersignup/designersignup.html',
        controller: 'DesignersignupCtrl'
      });
  });
