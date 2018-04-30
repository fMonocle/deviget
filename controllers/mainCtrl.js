"use strict";
app.controller("mainCtrl", function($scope, $location, mainService) {
	$scope.createGame = function() {
		$location.path("/start")
	}
});