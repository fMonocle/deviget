"use strict";
app.controller("gameCtrl", function($scope, $timeout, $location, gameService) {

	$scope.gameBoard = gameService.createGameBoard();
	$scope.modalShown = false;
	$scope.winner = false;
	$scope.loser = false;
	$scope.smileOpen = false;

	$scope.showSquare = function(square) {
		if (square.isFlag) {
			return;
		}
		//Block click after win or lose.
		if ($scope.winner || $scope.loser) {
			return;
		}
		square.isClicked = true;
		$scope.y = square.id;
	};

	$scope.setRow = function(row) {
		if ($scope.winner || $scope.loser) {
			return;
		}
		$scope.x = row.id;
		let location = {
			x: $scope.x,
			y: $scope.y
		}
		gameService.expand(location, $scope.gameBoard);
		let result = gameService.checkSquareClicked($scope.gameBoard);
    	if (result === "won") {
    		$scope.winner = true;
    		$timeout(function() {
	    		$scope.modalShown = !$scope.modalShown;
	    		$scope.text = "You are a winner!"
	    	}, 750);
	    } else if (result === "lost") {
	    	$scope.loser = true;
	    	$timeout(function() {
	    		$scope.modalShown = !$scope.modalShown;
	    		$scope.text ="loser haha!"
	    	}, 750);
	    }
	}

	$scope.flag = function(square) {
		if ($scope.winner || $scope.loser) {
			return;
		}
		square.isFlag = !square.isFlag;
	};

	$scope.resetGame = function() {
		$scope.gameBoard = gameService.createGameBoard();
		$scope.modalShown = false;
		$scope.winner = false;
		$scope.loser = false;
	}

	$scope.goHome = function() {
		$location.path("/");
	}
});