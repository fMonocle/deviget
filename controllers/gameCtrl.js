"use strict";
app.controller("gameCtrl", function($scope, $timeout, $location, gameService) {

	$scope.gameBoard = gameService.createGameBoard();

});