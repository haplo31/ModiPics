'use strict';

angular.module('modiPicsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/usersignup', {
        templateUrl: 'app/usersignup/usersignup.html',
        controller: 'UsersignupCtrl'
      });
  });
