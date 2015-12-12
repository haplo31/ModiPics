'use strict';

angular.module('modiPicsApp')
  .controller('MainCtrl', function ($scope, $http, socket,$timeout,$modal) {
    // $scope.Pics = [ 
    //                     {owner:"John",artist:"Protoshop",modtype:"Adding character",vote:0,name:"paysage",src:"http://www.picturalium.com/photophotos/telecharger/258"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Removing character",vote:0,name:"logo",src:"http://musique-libre-de-droit.cowblog.fr/images/4868.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Adding character",vote:0,name:"spectacle",src:"http://vincent-presse.com/dossiers/SEA_GIRLS_FIN_DU_MONDE_SITE/hds/SEA%20GIRLS%20FIN%20DU%20MONDE%202010%20OMBRELLE%20libre%20de%20droit.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Adding character",vote:0,name:"mariage",src:"http://2l-image.com/wpimages/wp0753ce26_05_06.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Creation",vote:0,name:"bebe",src:"http://www.kadolog.com/sites/default/files/img/home-slider-liste-de-naissance-1.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Improvements",vote:0,name:"plat",src:"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSx_i-WROPoU07q5_qujRQBweH860k4YZ7ArigWRqK1LwPM2SCg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Creation",vote:0,name:"bebe",src:"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQeiflQvYH2EREjSNXLGBi3qcTralhmNnaPYp9OX6OZo6L7tB-9"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Removing character",vote:0,name:"bateau",src:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqiw0_7y5GMBiizw7ygj55un0IItExW1Gx0uPmqd8NSRtK2ze9EA"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Creation",vote:0,name:"sumo",src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7MLr5aTk89Ynl4rntVWSRjEbPwXShAOxPJaHx4f7ayIWtigfy"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Creation",vote:0,name:"old",src:"http://www.doityvette.fr/wp-content/uploads/2014/07/new-old-stock-3.png"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Removing character",vote:0,name:"portrait",src:"http://patiange.p.a.pic.centerblog.net/33acfa89.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Creation",vote:0,name:"plage",src:"http://www.photosgratuiteslibresdedroits.com/photosgratuites/376_plage_mont_choisy_mini_640.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Inscrustation",vote:0,name:"jardin",src:"http://www.picturalium.com/photophotos/telecharger/815"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Adding character",vote:0,name:"famille",src:"http://thumbs.dreamstime.com/z/famille-heureux-775568.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Inscrustation",vote:0,name:"mariage",src:"http://img.over-blog.com/600x397/4/35/94/82/Carole/Mariage-Carole-Yann---Famille---JDerache--98-.JPG"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Mixing photos",vote:0,name:"portrait",src:"https://www.pascalboegli.com/wp-content/uploads/malawi/49-portrait-enfant-malawi.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Removing character",vote:0,name:"chat",src:"http://www.enfant.com/pictures/articles/0000/310.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Adding character",vote:0,name:"skate",src:"http://www.college-romainrolland-pontivy.fr/IMG/jpg/skate.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Removing character",vote:0,name:"chien",src:"http://www.chien-guide.com/IMG/jpg/chien_4_.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Inscrustation",vote:0,name:"dessin",src:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS6qvJm1JynPFbBKlwwGOZ5RO_pIinFXLXPEF6oQCd7C7GawAvwHg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Removing character",vote:0,name:"famille",src:"https://www.higheroneaccount.com/images/student/outpages/photo-free.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Improvements",vote:0,name:"shoot",src:"http://static.independent.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2015/07/28/15/Happy-birthday.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Improvements",vote:0,name:"pont",src:"http://www.freefoto.com/images/9912/01/9912_01_1095---Tyne-Bridge--Sunset_web.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Inscrustation",vote:0,name:"mariage",src:"http://mattetsuzie.com/wp-content/uploads/2014/08/Photo-Mariage-Auberge-St-Antoine_Vieux-Quebec_15.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Improvements",vote:0,name:"golf",src:"http://visit-hungary.com/site/upload/2009/12/Golf.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Mixing photos",vote:0,name:"me",src:"https://avatars3.githubusercontent.com/u/4218815?v=3&s=460"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Mixing photos",vote:0,name:"oldpeople",src:"http://www.gettyimages.com/gi-resources/images/RoyaltyFree/109720793.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Mixing photos",vote:0,name:"fun",src:"http://media-cdn.tripadvisor.com/media/photo-s/01/1c/7a/d7/cancun.jpg"},
    //                     {owner:"John",artist:"Protoshop",modtype:"Adding character",vote:0,name:"unicorn",src:"http://wallbasehq.net/images/medium/a-rainbow_unicorn-1526281.jpg"}
    // ];
    $scope.homeVisible=true;
    $scope.catVisible=false;
    $scope.mozaic=true;
    $scope.dashboard=false;
    $scope.resetHome = function() {
      $scope.homeVisible=true;
      $scope.catVisible=false;
      $scope.mozaic=true;
      $scope.dashboard=false;
      $http.get('/api/pictures/last').success(function(pictures) {
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
.controller('CreaInstanceCtrl', function ($scope, $modalInstance,$timeout, item, Upload,$http) {
  $timeout(function(){$('.slider').slider(); }, 0);   
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
  
  //Gerer la suppression
  $scope.uploadFiles = function(file, errFiles) {
    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    if (file) {
      Upload.upload({
          url: 'upload',
          data: {file: file}
      }).then(function (resp) {
        console.log(file)
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
          $http.post('/api/pictures/',{owner:"John",artist:"Protoshop",modtype:"",vote:0,name:resp.config.data.file.name,src:"/public/"+resp.config.data.file.name});
          $scope.uploadedImgSrc="http://"+location.host+"/public/"+resp.config.data.file.name;
      }, function (resp) {
          console.log('Error status: ' + resp.status);
      }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    }   
  }
  $scope.btnToDrag=[{'posTop': '0','posLeft': '0'}]
  $scope.drag = function(attr) {
  }
  var btnReset=false;
  $scope.click = function(index) {
    if(angular.element(document.querySelector('#btn'+index)).prop('offsetTop')<0){
      console.log("moins")
      btnReset=true;
      // $scope.btnToDrag[$scope.btnToDrag.map(function(e) { return e.id; }).indexOf(id)].posTop=0;
      // $scope.btnToDrag[$scope.btnToDrag.map(function(e) { return e.id; }).indexOf(id)].posLeft=0;
      console.log($scope.btnToDrag[index-1])
      $scope.btnToDrag.splice((index-1),1)
    }
    if ($scope.btnToDrag.length>1){
      $scope.compStep=1;
    }
    else{
      $scope.compStep=0;
    }
  }
  var nbBtnOnPic=0;
  $scope.drop = function(valid){
    if (angular.element(document.querySelector('#btn'+$scope.btnToDrag.length)).prop('offsetTop')>=0){
      console.log("reset")
    }
    else{
    //nbBtnOnPic++;
      $scope.btnToDrag.push({'posTop': '0','posLeft': '0'})
      console.log("push")
    }
    if ($scope.btnToDrag.length>1){
      $scope.compStep=1;
    }
    else{
      $scope.compStep=0;
    }
  }
  $scope.goto = function(index){
    if(index<=$scope.compStep+1)
    $scope.step=index;
  }
})