'use strict';

angular.module('modiPicsApp')
  .controller('DesignersignupCtrl', function ($scope, Auth, $location, Upload) {
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
    $scope.QQAutoLogin="false";
    $scope.register = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        for (var i = 0; i < $scope.skills.length; i++) {
          if ($scope.skills[i].file){
            Upload.upload({
              url: 'uploadssk',
              data: {file:Upload.rename($scope.skills[i].file,$scope.user.username+"ssk"+i)}
            })
          }
        };
        Auth.createUser({
          name: $scope.user.username,
          firstname: $scope.user.firstname,
          lastname: $scope.user.lastname,
          location: $scope.user.location,
          email: $scope.user.email,
          password: $scope.user.password,
          type: "designer",
          qqautolog: $scope.QQAutoLogin,
          gskills: {addPers: $scope.addpers || '0',
                    remPers: $scope.rempers || '0',
                    addObj: $scope.addobj || '0',
                    remObj: $scope.addobj || '0',
                    enh: $scope.enh || '0',
                    incr: $scope.incr || '0'},
          sskills: $scope.skills
        })
        .then( function() {
          // Account created, redirect to designer home
          $location.path('/designer');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};
          $scope.step=0;
          $scope.barStep=[{value:"20",text:"Account Informations"}];
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
      else{
        $scope.step=0;
        $scope.barStep=[{value:"20",text:"Account Informations"}];
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
    $scope.skillImages=[]
    $scope.uploadFiles = function(index,file, errFiles) {
      console.log($scope.skills)
      console.log(index)
      if (file){
        $scope.imageAsk=true;
        //$scope.file = file;
        $scope.skills[index].file=file
      }
      // $scope.errFile = errFiles && errFiles[0];
      // if (file) {

      // }   
    }
  });
