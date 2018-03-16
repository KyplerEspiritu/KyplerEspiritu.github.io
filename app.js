"use strict";
           

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var canvasWidth = context.canvas.width;
var canvasHeight = context.canvas.height;

var playerXpostion = 240;
var playerYpostion = 420;

context.fillStyle = "#035c70"; // Liturinn á kubbinn
context.fillRect(playerXpostion, playerYpostion, 20, 20); // playerXpostion er hvar kubburinn er staddur lárétt, playerYpostion lóðrétt, hvað kubburinn er langur, hvað kubburinn er hár  
window.addEventListener("mousemove", function(e){
	var mouseX = e.clientX - context.canvas.offsetLeft;
	if (mouseX <= canvasWidth - 19 && mouseX >= 0){ // Ef kubburinn er ekki kominn alveg til hægri eða vinstri
		playerXpostion = mouseX; // Kubburinn 'eltir' músina
	}

}); // EventListener 'hlustar' á eða fylgist með hreyfingu músins

var obstacles = [];  
var randomNumbers = [];
var obstacleSpace = -50;

for (var i = 0; i < 100; i++){
	var newObstacle = new create_obstacle(0, obstacleSpace, canvasWidth, 10);
	obstacleSpace -= 250;
	obstacles.push(newObstacle);
	randomNumbers.push(getRandomInt(60, canvasWidth - 250));
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
		if (obstacles[i].y_position >= canvasHeight){
			context.clearRect(obstacles[i].x_postion, obstacles[i].y_position, obstacles[i].width, obstacles[i].height);
		}
		else{
			context.fill();
			context.fillRect(obstacles[i].x_postion, obstacles[i].y_position += 1.5, obstacles[i].width, obstacles[i].height);
			context.fillRect(playerXpostion, playerYpostion, 20, 20); // Kubburinn fær nýja staðsetningu
			context.clearRect(randomNumbers[i], obstacles[i].y_position - 5, 200, 20);
		}
	}
}
function animation(){
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	render_obstacles();
}
setInterval(animation, 5);