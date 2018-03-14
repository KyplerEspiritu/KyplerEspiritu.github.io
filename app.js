"use strict";

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var canvasWidth = context.canvas.width;
var canvasHeight = context.canvas.height;
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
function obstacle(x_postion, y_position, width, height){
	this.x_postion = x_postion;
	this.y_position = y_position;
	this.width = width;
	this.height = height;

	this.renderObstacle = function(){
		context.fillRect(this.x_postion, this.y_position += 5, this.width, this.height);
	};

	this.animation = function(){
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		this.renderObstacle();
	};

	this.animationInterval = setInterval(this.animation(), 30);
}       

var obstacle_1 = new obstacle(0, -10, 100, 20); // Hello