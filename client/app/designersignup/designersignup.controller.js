'use strict';

angular.module('modiPicsApp')
  .controller('DesignersignupCtrl', function ($scope) {
    $scope.step=0;
    $scope.skills=[];
    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};
          step=0;
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
    $scope.addSkill = function(){
      $scope.skills.push({name:"",tags:"",price:""});
    }
    $scope.remSkill = function(key){
      console.log(key)
      $scope.skills.splice(key,1);
    }
    $scope.nextStep = function(){
      $scope.step++;
    }
    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
