'use strict';

angular.module('modiPicsApp')
  .controller('QqpropCtrl', function ($scope,item,designer,rating,Auth) {
    $scope.message = 'Hello';
    $scope.request = item;
    switch (item.modtype){
    	case 'remPers':
		if (item.modinfos.length>1){
			$scope.modtype="Remove "+item.modinfos.length+" persons"
		}
		else{
			$scope.modtype="Remove a person"
		}		
		break;
   	}
   	//console.log(designer[0].gskills[item.modtype].rating)
    switch (rating){
    	case 0:
		$scope.ratingsrc="/assets/images/starNew.png";
		break;
    	case 1:
		$scope.ratingsrc="/assets/images/starBronze.png";
		break;
    	case 2:
		$scope.ratingsrc="/assets/images/starSilver.png";
		break;
    	case 3:
		$scope.ratingsrc="/assets/images/starGold.png";
		break;
   	}
   	console.log(rating)
   	// var rtg=parseInt(rating)
   	// console.log(rtg)
   	// console.log(item.rating.indexOf(rtg))
   	 $scope.price=item.price[item.rating.indexOf(rating)]
  });
