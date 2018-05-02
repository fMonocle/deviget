let app = angular.module("minesweeper", ["ngRoute"])
.config(function($routeProvider) {
	$routeProvider
	.when("/start", {
		templateUrl: "templates/game.html",
		controller: "gameCtrl"
	})
	.when("/hard", {
		templateUrl: "templates/gameHard.html",
		controller: "gameHardCtrl"
	})
	.otherwise({
		redirectTo: "/"
	});
})