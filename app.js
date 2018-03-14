"use strict";


var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var canvasWidth = context.canvas.width;
var canvasHeight = context.canvas.height;
/*
var playerXpostion = 240;
var playerYpostion = 420;
context.fillStyle = "#FF0000"; // Liturinn á kubbinn
context.fillRect(playerXpostion, playerYpostion, 20, 20); // playerXpostion er hvar kubburinn er staddur lárétt, playerYpostion lóðrétt, hvað kubburinn er langur, hvað kubburinn er hár  
window.addEventListener("keydown", movePlayer); // EventListener sem bíður eftir að notandinn ýtti á takka á lyklaborðinu 

function movePlayer(e){
	if (e.keyCode == 39){ // Þegar notandinn ýtir á hægri ör
		if (playerXpostion < canvasWidth - 20){ // Ef kubburinn er ekki kominn alveg til hægri
			playerXpostion += 10; // Kubburinn færist til hægri
		}
	}
	if (e.keyCode == 37){ // Þegar notadninn ýtir á vinstri ör
		if (playerXpostion >= 10){ // Ef kubburinn er ekki kominn alveg til vinstri
			playerXpostion -= 10; // Kubburinn færist til vinstri
		}
	}
	context.clearRect(0, 0, canvasWidth, canvasHeight); // Þetta er fyrir svo kubburinn skilji ekki 'spor' þegar þú er að færa þig
	context.fillRect(playerXpostion, playerYpostion, 20, 20); // Kubburinn fær nýja staðsetningu
	context.fillStyle = "#FF0000";
	context.fill(); // Fylla kubbinn af lit
	context.stoke(); // Teikna kubbinn á nýja staðsetninguna
}
*/
var obstacles = []
var space = -50;
for (var i = 0; i < 45; i++){
	var obstacle = new create_obstacle(0, space, getRandomInt(50, 335), 20);
	space -= 200;
	obstacles.push(obstacle);
}

function create_obstacle(x_postion, y_position, width, height){
	this.x_postion = x_postion,
	this.y_position = y_position,
	this.width = width,
	this.height = height
}    

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function render_obstacles(){
	for (var i = 0; i < obstacles.length; i++){
		context.fill();
		context.fillRect(obstacles[i].x_postion, obstacles[i].y_position += 5, obstacles[i].width, obstacles[i].height);
	}
}
function animation(){
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	render_obstacles();
}
setInterval(animation, 30);
