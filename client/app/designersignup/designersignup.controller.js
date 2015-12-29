'use strict';

angular.module('modiPicsApp')
  .controller('DesignersignupCtrl', function ($scope) {
    $scope.step=0;
    $scope.barStep=[{value:"20",text:"Account Informations"}];
    $scope.skills=[];
    $scope.addPersonPrice="17€";
    $scope.remPersonPrice="13€";
    $scope.impPrice="18€";
    $scope.addPersonPriceBronze="19€";
    $scope.remPersonPriceBronze="14€";
    $scope.impPriceBronze="20€";
    $scope.addPersonPriceSilver="20€";
    $scope.remPersonPriceSilver="17€";
    $scope.impPriceSilver="22€";
    $scope.addPersonPriceGold="24€";
    $scope.remPersonPriceGold="19€";
    $scope.impPriceGold="26€";
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
    $scope.nextStep = function(actualstep){
      $scope.step++;
      $scope.barStep.push({value:"20",text:actualstep})
    }
    $scope.prevStep = function(){
      $scope.step--;
      $scope.barStep.splice($scope.barStep.length-1,1)
    }
    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
