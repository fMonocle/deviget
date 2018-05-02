"use strict";
app.controller("gameHardCtrl", function($scope, $timeout, $location, gameHardService) {

	$scope.gameBoard = gameHardService.createGameBoard();
	$scope.modalShown = false;
	$scope.winner = false;
	$scope.loser = false;

	$scope.showSquare = function(square) {
		if (square.isFlag) {
			return;
		}
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
		gameHardService.expand(location, $scope.gameBoard);
		let result = gameHardService.checkSquareClicked($scope.gameBoard);
    	if (result === "won") {
    		$scope.wonMessage = true;
    		$timeout(function() {
	    		$scope.modalShown = !$scope.modalShown;
	    		$scope.text = "hard winner!"
	    	}, 750);
	    } else if (result === "lost") {
	    	$scope.lostMessage = true;
	    	$timeout(function() {
	    		$scope.modalShown = !$scope.modalShown;
	    		$scope.text ="hard loser haha!"
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
		$scope.gameBoard = gameHardService.createGameBoard();
		$scope.modalShown = false;
		$scope.winner = false;
		$scope.loser = false;
	}

	$scope.goHome = function() {
		$location.path("/");
	}


});