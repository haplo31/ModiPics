'use strict';

angular.module('modiPicsApp')
  .controller('MainCtrl', function ($scope, $rootScope, Auth, $http, $timeout,$modal,$location,socket) {
     socket.on('qqprop', function (data) {
      console.log(data)
    });
     $scope.$on('$destroy', function (event) {
    socket.removeAllListeners();
});
    $scope.homeVisible=true;
    $scope.catVisible=false;
    $scope.mozaic=true;
    $scope.dashboard=false;
    $scope.resetHome = function() {
      $scope.homeVisible=true;
      $scope.catVisible=false;
      $scope.mozaic=true;
      $scope.dashboard=false;
      $http.get('/api/pictures/most').success(function(pictures) {
        $scope.Pics=pictures
      });
    }
    $scope.urlHost=location.host;   
    $scope.askFor = function() {
      $scope.mozaic=false;
      $scope.dashboard=true;
    }
    $scope.explore = function() {
      $timeout(function(){$scope.catVisible=true; }, 750);
      $scope.mozaic=true;
             
    }
    $scope.mostVotedPics = function() {
      $http.get('/api/pictures/most').success(function(pictures) {
        $scope.Pics=pictures
      });
    }
    $scope.lastPics = function() {
      $http.get('/api/pictures/last').success(function(pictures) {
        $scope.Pics=pictures
      }); 
    }
    $scope.hallOfFame = function() {

    }
    $scope.modalPic = function(item) {
      console.log(item.src)
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '../../components/modal/modal.html',
        controller: 'ModalInstanceCtrl',
        size: "lg",
        resolve: {
          item: function () {
            return item;
          },
          vote: function () {
          return $scope.vote;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
      });
    };
    $scope.creaRem = function(item) {
      var creaInstance = $modal.open({
        animation: true,
        templateUrl: '../../components/creablock/creablock.html',
        controller: 'CreaInstanceCtrl',
        size: "lg",
        resolve: {
          item: function () {
            return item;
          }
          // item: function () {
          //   return item;
          // },
          // vote: function () {
          // return $scope.vote;
          // }
        }
      });
      creaInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
      });
    };
    $scope.vote=function(pic){
      console.log(pic)
      pic.vote+=1;
      console.log(pic)
      $http.put('/api/pictures/'+pic._id, pic);
    }

    $http.get('/api/pictures/last').success(function(pictures) {
      $scope.Pics=pictures
    });
        $(".topImage").css('width', '50%');
  $(".beforeAfterSlidebar").mousemove(
    function(e) {
      // get the mouse x (horizontal) position and offset of the div
      var offset =  $(this).offset();
      var iTopWidth = (e.pageX - offset.left);

      // set width of bottomimage div
      $(this).find(".topImage").width(iTopWidth);
    }
  );
  })
.controller('ModalInstanceCtrl', function ($scope, $modalInstance, item, vote) {
  $scope.modalItem=item;
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
  $scope.close = function () {
    $modalInstance.close();
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  $scope.addVote = function () {
    $scope.result = vote(item);
  };
})
.controller('CreaInstanceCtrl', function ($scope, $modalInstance,$timeout, item, Upload,$http,$activityIndicator, Auth) {
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.radioModel = 'Excellent';
  $scope.qualityMessage="The best quality for goodies or printing ! The editing will be very nice, and only a close examination will reveal it."
        // $activityIndicator.startAnimating();
        // $timeout(function () {
        //     $activityIndicator.stopAnimating();
        // }, 3000);
  if (document.documentElement.clientWidth<200){
    $scope.sliderSource1="/assets/images/rem1l.png"
    $scope.sliderSource2="/assets/images/rem2l.png"
  }
  else{
    $scope.sliderSource1="/assets/images/rem1.png"
    $scope.sliderSource2="/assets/images/rem2.png"
  }
  $timeout(function(){$('.slider').slider(); }, 100);   
  $scope.modalItem=item;
  $scope.step=0;
  $scope.compStep=0;
  $scope.next = function () {
    console.log("next")
    $scope.step+=1;
  };
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
  $scope.close = function () {
    $modalInstance.close();
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  $scope.uploadFiles = function(file, errFiles) {
    if (file){
      $scope.imageAsk=true;
      $scope.file = file;
    }
    // $scope.errFile = errFiles && errFiles[0];
    // if (file) {
    //   Upload.upload({
    //       url: 'upload',
    //       data: {file: file}
    //   }).then(function (resp) {
    //     console.log(file)
    //       console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    //       $http.post('/api/pictures/',{owner:"John",artist:"Protoshop",modtype:"",vote:0,name:resp.config.data.file.name,src:resp.config.data.file.name}).success(function(){
    //         $scope.uploadedImgSrc="http://"+location.host+"/public/"+resp.config.data.file.name;
    //       });      
    //   }, function (resp) {
    //       console.log('Error status: ' + resp.status);
    //   }, function (evt) {
    //       var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //       console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //   });
    // }   
  }
  $scope.quaselected=function(radio){
    if(radio==="Good"){
      $scope.qualityMessage="A good quality for social networks or mobile wallpapers but the editing may be visible up close."
    }
    else if (radio==="Excellent"){
      $scope.qualityMessage="The best quality for goodies or printing ! The editing will be very nice, and only a close examination will reveal it."
    }
    else if (radio==="Perfect"){
      $scope.qualityMessage="Even a professionnal eye may have trouble to see where the editing occured! It's a quality for 4X4 meters panels or if you don't like compromises."
    }
    console.log(radio)
  }  
  $scope.$watch('infos', function (value) {
        $scope.addInfos = value;
  });
  $scope.noratingSelected=true;
  $scope.bronzeratingSelected=true;
  $scope.estimatePrice=function(){
    var calculatedPrice= 10;
    var finalPrices = [];
    calculatedPrice += (calculatedPrice*0.2)*($scope.btnPlaced.length-1)
    if ($scope.radioModel==="Excellent"){
      calculatedPrice += (calculatedPrice*0.2)
    }
    else if ($scope.radioModel==="Perfect"){
      calculatedPrice += (calculatedPrice*0.4)
    }
    if ($scope.noratingSelected){
      finalPrices.push(parseInt(calculatedPrice,10));
    }
    if ($scope.bronzeratingSelected){
      finalPrices.push(parseInt(calculatedPrice + (calculatedPrice*0.15),10))
    }
    if ($scope.silverratingSelected){
      finalPrices.push(parseInt(calculatedPrice + (calculatedPrice*0.25),10))
    }
    if ($scope.goldratingSelected){
      finalPrices.push(parseInt(calculatedPrice + (calculatedPrice*0.40),10))
    }
    if (finalPrices.length>1){
      $scope.estimatedPrice= finalPrices[0]+"-"+finalPrices[finalPrices.length-1]+"€"
    }
    else{
      $scope.estimatedPrice=finalPrices[0]+"€"
    }
  } 
  $scope.$watchGroup(['btnPlaced', 'radioModel','btnPlaced|json'], function(newValues, oldValues, scope) {
    $scope.estimatePrice();
  }); 
  $scope.btnPlaced = [];
  var posTop,posLeft,imgWidth,imgHeight;
  $scope.select= function(color){
    $scope.redPointer = true;
    return false;
  }
  $scope.clickOnImg = function(event){
    if ($scope.redPointer === true){
      posTop=angular.element(document.querySelector('#picturezone')).prop('offsetTop')+event.offsetY-24
      posLeft=angular.element(document.querySelector('#picturezone')).prop('offsetLeft')+event.offsetX-24
      imgWidth=angular.element(document.querySelector('#picturezone')).prop('width')
      imgHeight=angular.element(document.querySelector('#picturezone')).prop('height')
      $scope.btnPlaced.push({'posTop': posTop,'posLeft': posLeft,'width': imgWidth, 'height': imgHeight})
      console.log(posTop)
      console.log(posLeft)
      console.log(imgWidth)
      console.log(imgHeight)
      console.log("")
      $scope.redPointer = false;
      $scope.compStep=2;
    }
  }
  $scope.removePlaced = function(index){
    $scope.btnPlaced.splice(index,1)
    if ($scope.btnPlaced.length === 0){
      $scope.compStep=0;
    }
  }
  $scope.artistRating=[ {name:'Not evaluated',url:'/assets/images/starNew.png',selected:'1'},
                        {name:'rating3',url:'/assets/images/starBronze.png',selected:'1'},
                        {name:'rating4',url:'/assets/images/starSilver.png',selected:'1'},
                        {name:'rating5',url:'/assets/images/starGold.png',selected:'1'}]
  // $scope.valueStar = function(index){
  //   return $scope.artistRating[index].url
  // }
  $scope.changeStar = function(index){
    if ($scope.artistRating[index].selected==='1'){
      $scope.artistRating[index].selected='0'
    }
    else{
      $scope.artistRating[index].selected='1'
    }
  }  
  $scope.goto = function(index){
    if(index<=$scope.compStep+1)
    $scope.step=index;
  }
  $scope.submitRequest = function(){
    if (Auth.isLoggedIn()){
      var picSrc=Auth.getCurrentUser().name + new Date().getTime()
      picSrc = picSrc.replace(/\s+/g, '');
      console.log($scope.file)
      if ($scope.file.name.indexOf(".png")>0){
         picSrc +=".png"
      }
      else{
        picSrc +=".jpg"
      }
      var ratingSelected = []
      if ($scope.noratingSelected){
        ratingSelected.push("norating")
      }
      if ($scope.bronzeratingSelected){
        ratingSelected.push("bronze")
      }
      if ($scope.silverratingSelected){
        ratingSelected.push("silver")
      }
      if ($scope.goldratingSelected){
        ratingSelected.push("gold")
      }
      Upload.upload({
          url: 'upload',
          data: {file:Upload.rename($scope.file,picSrc)}
      }).then(function (resp) {
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
          $http.post('/api/qqueries/',{owner:Auth.getCurrentUser().name,artist:"",modtype:"remPers",vote:0,src:picSrc,modinfos:$scope.btnPlaced,addinfos:$scope.addInfos,quality:$scope.radioModel,rating:ratingSelected,available:"true"}).success(function(){
          });      
      }, function (resp) {
          console.log('Error status: ' + resp.status);
      }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    }
    else{

    }

  }
})