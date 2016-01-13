'use strict';

angular.module('modiPicsApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window,socket) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          Auth.isLoggedInAsync(function(result){
            if (result){
              if (Auth.getCurrentUser().qqautolog){
                console.log("autolog")
                socket.emit("qqdesigner",{name:Auth.getCurrentUser().name,gskills:Auth.getCurrentUser().gskills,date:new Date().getTime()})
              }
              if (/*(Auth.getCurrentUser().pending.length>0)&&*/(Auth.getCurrentUser().role === 'user')){
                console.log("pending")
                socket.emit("user",{name:Auth.getCurrentUser().name,socket:socket.id})
              }
            }
          })
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
