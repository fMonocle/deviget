"use strict";
app.service("gameService", function($timeout) {
	this.createGameBoard = function() {
		let maxRows = 9;
		let maxCols = 9;
		let mines = 10;
		let minefield = {};
		let currentLocation = [];
    	minefield.rows = [];

    	//populate the rows
    	for(let i = 0; i < maxRows; i++) {
        	let row = {};
        	row.spots = [];
        	row.id = i;
        	
        	//populate the spots
	        for(let j = 0; j < maxCols; j++) {
	            let spot = {};
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