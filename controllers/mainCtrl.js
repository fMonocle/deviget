"use strict";
app.controller("mainCtrl", function($scope, $location, mainService) {
	$scope.createGame = function() {
		$location.path("/start")
	}
	$scope.createHardGame = function() {
		$location.path("/hard")
	}
});