'use strict';

angular.module('modiPicsApp')
  .controller('MainCtrl', function ($scope, $http, socket,$timeout,$modal) {
    $scope.LPics = [ {name:"licorne",src:"http://images.alphacoders.com/136/thumb-350-136423.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"paysage",src:"http://www.picturalium.com/photophotos/telecharger/258"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"logo",src:"http://musique-libre-de-droit.cowblog.fr/images/4868.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"spectacle",src:"http://vincent-presse.com/dossiers/SEA_GIRLS_FIN_DU_MONDE_SITE/hds/SEA%20GIRLS%20FIN%20DU%20MONDE%202010%20OMBRELLE%20libre%20de%20droit.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"mariage",src:"http://2l-image.com/wpimages/wp0753ce26_05_06.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"bebe",src:"http://www.kadolog.com/sites/default/files/img/home-slider-liste-de-naissance-1.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"plat",src:"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSx_i-WROPoU07q5_qujRQBweH860k4YZ7ArigWRqK1LwPM2SCg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"bebe",src:"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQeiflQvYH2EREjSNXLGBi3qcTralhmNnaPYp9OX6OZo6L7tB-9"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"bateau",src:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqiw0_7y5GMBiizw7ygj55un0IItExW1Gx0uPmqd8NSRtK2ze9EA"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"sumo",src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7MLr5aTk89Ynl4rntVWSRjEbPwXShAOxPJaHx4f7ayIWtigfy"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"old",src:"http://www.doityvette.fr/wp-content/uploads/2014/07/new-old-stock-3.png"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"portrait",src:"http://patiange.p.a.pic.centerblog.net/33acfa89.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"plage",src:"http://www.photosgratuiteslibresdedroits.com/photosgratuites/376_plage_mont_choisy_mini_640.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"jardin",src:"http://www.picturalium.com/photophotos/telecharger/815"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"famille",src:"http://thumbs.dreamstime.com/z/famille-heureux-775568.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"mariage",src:"http://img.over-blog.com/600x397/4/35/94/82/Carole/Mariage-Carole-Yann---Famille---JDerache--98-.JPG"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"portrait",src:"https://www.pascalboegli.com/wp-content/uploads/malawi/49-portrait-enfant-malawi.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"chat",src:"http://www.enfant.com/pictures/articles/0000/310.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"skate",src:"http://www.college-romainrolland-pontivy.fr/IMG/jpg/skate.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"chien",src:"http://www.chien-guide.com/IMG/jpg/chien_4_.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"dessin",src:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS6qvJm1JynPFbBKlwwGOZ5RO_pIinFXLXPEF6oQCd7C7GawAvwHg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"famille",src:"https://www.higheroneaccount.com/images/student/outpages/photo-free.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"shoot",src:"http://static.independent.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2015/07/28/15/Happy-birthday.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"pont",src:"http://www.freefoto.com/images/9912/01/9912_01_1095---Tyne-Bridge--Sunset_web.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"mariage",src:"http://mattetsuzie.com/wp-content/uploads/2014/08/Photo-Mariage-Auberge-St-Antoine_Vieux-Quebec_15.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"golf",src:"http://visit-hungary.com/site/upload/2009/12/Golf.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"me",src:"https://avatars3.githubusercontent.com/u/4218815?v=3&s=460"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"oldpeople",src:"http://www.gettyimages.com/gi-resources/images/RoyaltyFree/109720793.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"fun",src:"http://media-cdn.tripadvisor.com/media/photo-s/01/1c/7a/d7/cancun.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"unicorn",src:"http://wallbasehq.net/images/medium/a-rainbow_unicorn-1526281.jpg"}
    ];
    $scope.MVPics = [   {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"spectacle",src:"http://vincent-presse.com/dossiers/SEA_GIRLS_FIN_DU_MONDE_SITE/hds/SEA%20GIRLS%20FIN%20DU%20MONDE%202010%20OMBRELLE%20libre%20de%20droit.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"mariage",src:"http://2l-image.com/wpimages/wp0753ce26_05_06.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"plage",src:"http://www.photosgratuiteslibresdedroits.com/photosgratuites/376_plage_mont_choisy_mini_640.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"jardin",src:"http://www.picturalium.com/photophotos/telecharger/815"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"famille",src:"http://thumbs.dreamstime.com/z/famille-heureux-775568.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"mariage",src:"http://img.over-blog.com/600x397/4/35/94/82/Carole/Mariage-Carole-Yann---Famille---JDerache--98-.JPG"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"portrait",src:"https://www.pascalboegli.com/wp-content/uploads/malawi/49-portrait-enfant-malawi.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"chat",src:"http://www.enfant.com/pictures/articles/0000/310.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"skate",src:"http://www.college-romainrolland-pontivy.fr/IMG/jpg/skate.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"chien",src:"http://www.chien-guide.com/IMG/jpg/chien_4_.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"dessin",src:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS6qvJm1JynPFbBKlwwGOZ5RO_pIinFXLXPEF6oQCd7C7GawAvwHg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"famille",src:"https://www.higheroneaccount.com/images/student/outpages/photo-free.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"shoot",src:"http://static.independent.co.uk/s3fs-public/styles/story_large/public/thumbnails/image/2015/07/28/15/Happy-birthday.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"pont",src:"http://www.freefoto.com/images/9912/01/9912_01_1095---Tyne-Bridge--Sunset_web.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"mariage",src:"http://mattetsuzie.com/wp-content/uploads/2014/08/Photo-Mariage-Auberge-St-Antoine_Vieux-Quebec_15.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"golf",src:"http://visit-hungary.com/site/upload/2009/12/Golf.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"me",src:"https://avatars3.githubusercontent.com/u/4218815?v=3&s=460"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"oldpeople",src:"http://www.gettyimages.com/gi-resources/images/RoyaltyFree/109720793.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"fun",src:"http://media-cdn.tripadvisor.com/media/photo-s/01/1c/7a/d7/cancun.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"unicorn",src:"http://wallbasehq.net/images/medium/a-rainbow_unicorn-1526281.jpg"}
                        

    ];
    $scope.MCPics = [ {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"bateau",src:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRqiw0_7y5GMBiizw7ygj55un0IItExW1Gx0uPmqd8NSRtK2ze9EA"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"sumo",src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7MLr5aTk89Ynl4rntVWSRjEbPwXShAOxPJaHx4f7ayIWtigfy"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"old",src:"http://www.doityvette.fr/wp-content/uploads/2014/07/new-old-stock-3.png"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"portrait",src:"http://patiange.p.a.pic.centerblog.net/33acfa89.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"plage",src:"http://www.photosgratuiteslibresdedroits.com/photosgratuites/376_plage_mont_choisy_mini_640.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"jardin",src:"http://www.picturalium.com/photophotos/telecharger/815"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"famille",src:"http://thumbs.dreamstime.com/z/famille-heureux-775568.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"mariage",src:"http://img.over-blog.com/600x397/4/35/94/82/Carole/Mariage-Carole-Yann---Famille---JDerache--98-.JPG"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"portrait",src:"https://www.pascalboegli.com/wp-content/uploads/malawi/49-portrait-enfant-malawi.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"chat",src:"http://www.enfant.com/pictures/articles/0000/310.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"skate",src:"http://www.college-romainrolland-pontivy.fr/IMG/jpg/skate.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"chien",src:"http://www.chien-guide.com/IMG/jpg/chien_4_.jpg"},
                        {owner:"John",artist:"Protoshop",voteplus:0,votemoins:0,name:"dessin",src:"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS6qvJm1JynPFbBKlwwGOZ5RO_pIinFXLXPEF6oQCd7C7GawAvwHg"}
    ];
    $scope.showLP=true;
    $scope.showMVP=false;
    $scope.showMCP=false;
    $scope.homeVisible=true;
    $scope.catVisible=false;
    $scope.askFor = function() {
    }
    $scope.explore = function() {
      $timeout(function(){$scope.catVisible=true; }, 750);
             
    }
    $scope.mostVotedPics = function() {
      $scope.showLP=false;
      $scope.showMVP=true;
      $scope.showMCP=false;  
    }
    $scope.lastPics = function() {
      $scope.showLP=true;
      $scope.showMVP=false;
      $scope.showMCP=false;  
    }
    $scope.monthChallengePics = function() {
      $scope.showLP=false;
      $scope.showMVP=false;
      $scope.showMCP=true;  
    }
    $scope.modalPic = function(item) {
      console.log(item.src)
      var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '../../components/modal/modal.html',
      controller: 'ModalInstanceCtrl',
      size: "lg",
      resolve: {
        item: function () {
          return item;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };


    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  })
.controller('ModalInstanceCtrl', function ($scope, $modalInstance, item) {

  console.log(item)
  $scope.modalItem=item;
  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
