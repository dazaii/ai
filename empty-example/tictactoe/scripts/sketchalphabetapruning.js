

var r, markRadius,row,col,grid;
let board = [0,1,2,3,4,5,6,7,8];
var demo = "";
var owari = 0;
function setup(){
	let cont = document.getElementById("container");
	let canv = createCanvas(500,500);
	canv.parent(cont);
	background(20);
	r = width/3;
	markRadius = width/5;
	row = 3;
	col = 3;
	grid = row * col;
	frameRate(30);
}
function draw(){
	background(10,20,80);
		stroke(255);
		noFill();
		strokeWeight(16);
	for(i=0; i<grid; i++){
		for(j=0; j<grid; j++){
			strokeWeight(5);
			stroke(0);
			beginShape(LINES);
			vertex(j*r,i*r);
			vertex((j+1)*r,i*r);
			vertex(j*r,i*r);
			vertex(j*r,(i+1)*r);
			endShape();
			strokeWeight(16);
			stroke(255);
		}
	}
	for(i=0; i<grid; i++){
		for(j=0; j<grid; j++){
			if(board[j+i*row] == "O"){
				humanmark = new O(j*r+r/2,i*r+r/2,markRadius);
			}else if((board[j+i*row] == "X")){
				aimark = new X(j*r+r/2,i*r+r/2,markRadius);
			}
		}
	}
	fill(200,255,0);
	textSize(20);
	noStroke();
	text(demo, width/2-70,height/2-70);
	stroke(200,255,0,100);
	
	//simple indicators
	ellipse(mouseX, mouseY, 20,20);
	for(i=0; i<grid; i++){
		for(j=0; j<grid; j++){
			if(mouseX>j*r && mouseX<j*r+r && mouseY>i*r && mouseY<i*r+r){
				if(board[j+i*row] == j+i*row){
					new X(j*r+r/2,i*r+r/2,markRadius);
				}
			}
		}
	}
}
function reset(){
	for(i=0;i<board.length;i++){
		board[i] = i;
	}
	owari = 0;
	demo = "";
}
function mousePressed(){
	var beforemove = availableSpots(board);
	var aftermove;
	if(owari == 1) return;
	var aicloneboard = clone(board);
	var aiavailable = availableSpots(aicloneboard);
	var aieval, aiminEval = -1000;
	var aibestmove = aiavailable[0];
	if(aiavailable.length == 9){
		for(i=0; i<grid; i++){
			for(j=0; j<grid; j++){
				if(mouseX>j*r && mouseX<j*r+r && mouseY>i*r && mouseY<i*r+r){
					if(board[j+i*row] == j+i*row){
						board[j+i*row] = "X";
					}
				}
			}
		}
	}else{
		for(var i=0; i<aiavailable.length; i++){
			aicloneboard[aiavailable[i]] = "X";
			aieval = minimax(aicloneboard, -1000, 1000, false);
			aicloneboard[aiavailable[i]] = aiavailable[i];
			if(aieval > aiminEval){
				aiminEval = aieval;
				aibestmove = aiavailable[i];
			}
		}
		board[aibestmove] = "X";
	}

	
	var cloneboard = clone(board);
	aftermove = availableSpots(cloneboard);
	if(aftermove.length == beforemove.length){
		return;
	}
	var available = availableSpots(cloneboard);
	var eval, minEval = 1000;
	var bestmove = available[0];
	for(var i=0; i<available.length; i++){
		cloneboard[available[i]] = "O";
		eval = minimax(cloneboard, -1000, 1000, true);
		cloneboard[available[i]] = available[i];
		if(eval < minEval){
			minEval = eval;
			bestmove = available[i];
		}
	}
	board[bestmove] = "O";
	if(checkwinner(board) == -1){
		demo = "Computer Wins!";
		owari = 1;
	}else if(checkwinner(board) == 1){
		demo = "Congratulations!";
		owari = 1;
	}
}
function clone(state){
	var boardclone = [];
	for(i=0; i< state.length; i++){
		boardclone[i] = state[i];
	}
	return boardclone;
}
function availableSpots(state){
	var boardclone = [];
	var counter = 0;
	for(i=0; i< state.length; i++){
		if(state[i] == i){
			boardclone[counter] = state[i];
			counter++;
		}
	}
	return boardclone;
}
function checkwinner(state){
	var marks = ["X","O"];
	for(var i=0; i<2; i++){
		if(
			state[0] == state[1] && state[0] == state[2] && state[0] == marks[i] ||
			state[0] == state[4] && state[0] == state[8] && state[0] == marks[i] ||
			state[0] == state[3] && state[0] == state[6] && state[0] == marks[i] ||
			state[6] == state[4] && state[6] == state[2] && state[6] == marks[i] ||
			state[6] == state[7] && state[6] == state[8] && state[6] == marks[i] ||
			state[2] == state[6] && state[2] == state[4] && state[2] == marks[i] ||
			state[2] == state[5] && state[2] == state[8] && state[2] == marks[i] ||
			state[4] == state[3] && state[4] == state[5] && state[4] == marks[i] ||
			state[4] == state[7] && state[4] == state[1] && state[4] == marks[i]
		){
			if(marks[i] == "X") return 1;
			else if(marks[i] == "O") return -1;
		}
	}
	return 0;
}
function minimax(state, alpha, beta, maximize){
	var boardclone = clone(state);
	var available = availableSpots(boardclone);
	var winner = checkwinner(boardclone);
	if(winner != 0){
		return winner;
	}
	if(available.length == 0){
		return 0;
	}
	if(maximize){
		var eval, maxEval = -1000;
		for(var i=0; i<available.length; i++){
			boardclone[available[i]] = "X";
			eval = minimax(boardclone, alpha, beta, false);
			boardclone[available[i]] = available[i];
			maxEval = (eval > maxEval)?eval:maxEval;
			alpha = (eval > alpha)?eval:alpha;
			if(beta<=alpha) break;
		}
		return maxEval;
	}else{
		var eval, minEval = 1000;
		for(var i=0; i<available.length; i++){
			boardclone[available[i]] = "O";
			eval = minimax(boardclone, alpha, beta, true);
			boardclone[available[i]] = available[i];
			minEval = (eval < minEval)?eval:minEval;
			beta = (eval < beta)?eval:beta;
			if(beta<=alpha) break;
		}
		return minEval;
	}
}

