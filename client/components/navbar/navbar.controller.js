'use strict';

angular.module('modiPicsApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    if ($scope.getCurrentUser().type === "designer"){
      $scope.menu = [{
        'title': 'Home',
        'link': '/designer'
      }];
    }
    else{
      $scope.menu = [{
        'title': 'Home',
        'link': '/'
      }];      
    }
    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });