var myApp = angular.module('myApp', []);

myApp.controller('SpotCtrl', ['$scope', '$http', function($scope, $http){


activate();

function activate(){
		$http({
		method: 'GET',
		url: 'topspots.json'
		}).then(function (response){


	$scope.spots = response.data;

	for (i in $scope.spots){
	googleMapURL = "https://www.google.com/maps?q=";
	googleMapURL += $scope.spots[i].location[0] + "," + $scope.spots[i].location[1];
	googleMapURL = googleMapURL;

	}

	});
}

initMap = function(){
	var myCenter = new google.maps.LatLng(32.7151174, -117.1664042);

	var mapProp ={
		center: myCenter,
		zoom: 6,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map"), mapProp);

	var marker = [];

	var average  = [];
	for (i in $scope.spots){
		var lat = $scope.spots[i].location[0];
		var lng = $scope.spots[i].location[1];


		console.log(lat, lng)

		LatLng = {lat: lat, lng: lng};

		average.push(LatLng);


		marker[i] = new google.maps.Marker({
			position: LatLng,
			map: map,

		});

		marker[i].setMap(map);


	   google.maps.event.addListener(marker[i],'click',function() {
	      map.setZoom(17);
	      map.setCenter(marker[i].getPosition());
	   });

	   var infowindow = new google.maps.InfoWindow({
	      content:"AddressInfo"
	  })

	   google.maps.event.addListener(marker, 'mouseover', function() {
	      Infowindow.open(map,marker);
	   })

	   google.maps.event.addListener(marker, 'mouseout', function() {
	      Infowindow.close(map,marker);
	   });
	}
}
}]);
