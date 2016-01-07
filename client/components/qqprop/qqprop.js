'use strict';

angular.module('modiPicsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/qqprop', {
        templateUrl: 'app/qqprop/qqprop.html',
        controller: 'QqpropCtrl'
      });
  });
