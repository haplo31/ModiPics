'use strict';

angular.module('modiPicsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/designer', {
        templateUrl: 'app/designermain/designermain.html',
        controller: 'DesignermainCtrl'
      });
  });
