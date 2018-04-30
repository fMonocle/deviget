let app = angular.module("minesweeper", ["ngRoute"])
.config(function($routeProvider) {
	$routeProvider
	.when("/start", {
		templateUrl: "templates/game.html",
		controller: "gameCtrl"
	})
	.otherwise({
		redirectTo: "/"
	});
})