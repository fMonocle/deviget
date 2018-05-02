"use strict";
app.service("gameService", function($timeout) {

	this.createGameBoard = function() {
		let maxRows = 9;
		let maxCols = 9;
		let mines = 10;
		let minefield = {};
		let currentLocation = [];
    	minefield.rows = [];
    	
    	for(let i = 0; i < maxRows; i++) {
        	let row = {};
        	row.squares = [];
        	row.id = i;
        	
        	//populate the squares
	        for(let j = 0; j < maxCols; j++) {
	            let square = {};
	            square.isClicked = false;
	            square.isFlag = false;
	            square.content="empty";
	            square.id = j;
	            row.squares.push(square);
	        }
        
        	minefield.rows.push(row);
    	}

    	//find the current square you are on
    	let getsquare = function(minefield, row, column) {
    		return minefield.rows[row].squares[column];
		}

		//populate one mine
		let populateMine = function(minefield) {
				let row = Math.floor(Math.random() * 8.99999);
				let column = Math.floor(Math.random() * 8.99999);
				let square = getsquare(minefield, row, column);
				if (square.content === "mine") {
					populateMine(minefield);
					return;
				}
				square.content = "mine";
		}

		//randomize the mines that were populated
		let randomizeMines = function(minefield) {
			for (let i = 0; i < mines; i++) {
				populateMine(minefield);
			}
		}

		randomizeMines(minefield, getsquare);

		//calculate the number of mines touching that square
		//to do: rewrite me!
		let calculateNumber = function(minefield, row, column) {
			let thissquare = getsquare(minefield, row, column);

			if (thissquare.content === "mine") {
				return;
			}

			let mineCount = 0;

			if (row > 0) {
				if (column > 0) {
					let square = getsquare(minefield, row - 1, column - 1);
					if (square.content === "mine") {
						mineCount++;
					}
				}
				let square = getsquare(minefield, row - 1, column);
					if (square.content === "mine") {
						mineCount++;
					}
				if (column < maxCols - 1) {
					let square = getsquare(minefield, row - 1, column + 1);
					if (square.content === "mine") {
						mineCount++;
					}
				}
			}

			if (row < maxRows - 1) {
				if (column > 0) {
					let square = getsquare(minefield, row + 1, column - 1);
					if (square.content === "mine") {
						mineCount++;
					}
				}
				let square = getsquare(minefield, row + 1, column);
				if (square.content === "mine") {
						mineCount++;
				}
				if (column < maxCols - 1) {
					let square = getsquare(minefield, row + 1, column + 1);
					if (square.content === "mine") {
						mineCount++;
					}
				}	
			}

			if (column > 0) {
				let square = getsquare(minefield, row, column - 1);
				if (square.content === "mine") {
					mineCount++;
				}
			}

			if (column < maxCols - 1) {
				let square = getsquare(minefield, row, column + 1);
				if (square.content === "mine") {
					mineCount++;
				}
			}

			if (mineCount > 0) {
				thissquare.content = mineCount;
			}
		}

		
		let calculateAllNumbers = function(minefield) {
	    	for(let y = 0; y < maxRows; y++) {
	        	for(let x = 0; x < maxCols; x++) {
	            calculateNumber(minefield, x, y);
        		}
    		}
		}

		calculateAllNumbers(minefield);

		this.checkSquareClicked = function(minefield) {
			let squareCounter = 0;
			for (let y = 0; y < maxRows; y++) {
        		for (let x = 0; x < maxCols; x++) {
            		let square = getsquare(minefield, x, y);
            		//If the square is clicked and not a mine, increase the counter.
            		if (square.isClicked && square.content !== "mine") {
                		squareCounter++;
                	//If the square is clicked and a mine...
            		} else if (square.isClicked && square.content === "mine") {
            			square.content = "redMine";
            			//for each row...
            			minefield.rows.forEach(function(row) {
            				//for each square in that row...
            				row.squares.forEach(function(square) {
            					//if content is a mine, uncover it.
	            				if (square.content === "mine") {
	            					square.isClicked = true;
	            				}
	            			});
            			});
            			return "lost";
            		}
    			}
    		}
    		if ((maxRows * maxCols) - squareCounter === mines) {
    			return "won";
    		}
		}

		//expand empty squares up to squares with numbers
    	this.expand = function(coord, minefield){
		    let surroundingCoords = [
		    	{x: coord.x - 1, y: coord.y - 1},
		    	{x: coord.x - 1, y: coord.y},
		    	{x: coord.x - 1, y: coord.y + 1},

		    	{x: coord.x, y: coord.y - 1},
		    	{x: coord.x, y: coord.y + 1},

		    	{x: coord.x + 1, y: coord.y - 1},
		    	{x: coord.x + 1, y: coord.y},
		    	{x: coord.x + 1, y: coord.y + 1},
		    ];

		    surroundingCoords.forEach(function(coord) {
		    	if (coord.x >= 0 && coord.x < maxRows && coord.y >= 0 && coord.y < maxCols) {
		    		let square = getsquare(minefield, coord.x, coord.y)
		    		//If it's a mine...
		    		if (square.content === "mine") {
		    			return;
		    		}
		    		//If it's a number...
		    		if (!square.isClicked && square.content !== "empty" && square.content !== "mine") {
		    			square.isClicked = true;
		    			return;
		    		//If it's an empty square...
		    		} else if (!square.isClicked && square.content === "empty") {
		    			square.isClicked = true;
		    			return this.expand(coord, minefield)
		    		} else if (square.isClicked) {
		    			return;
		    		}
		    	}
		    }.bind(this))
		}
    	return minefield;
	}

});