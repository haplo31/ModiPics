'use strict';

angular.module('modiPicsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/ask', {
        templateUrl: 'app/ask/ask.html',
        controller: 'AskCtrl'
      });
  });
