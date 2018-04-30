"use strict";
app.service("gameService", function($timeout) {
	this.createGameBoard = function() {
		var maxRows = 9;
		var maxCols = 9;
		var mines = 10;
		var minefield = {};
		var currentLocation = [];
    	minefield.rows = [];

    	//populate the rows
    	for(var i = 0; i < maxRows; i++) {
        	var row = {};
        	row.spots = [];
        	row.id = i;
        	
        	//populate the spots
	        for(var j = 0; j < maxCols; j++) {
	            var spot = {};
	            spot.isClicked = false;
	            spot.isFlag = false;
	            spot.content="empty";
	            spot.id = j;
	            row.spots.push(spot);
	        }
        
        	minefield.rows.push(row);
    	}
    	
    	return minefield;
	}

});