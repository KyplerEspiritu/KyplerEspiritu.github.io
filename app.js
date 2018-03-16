"use strict";
           

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var canvasWidth = context.canvas.width;
var canvasHeight = context.canvas.height;

var playerXpostion = 240;
var playerYpostion = 800;

window.addEventListener("mousemove", function(e){
	var mouseX = e.clientX - context.canvas.offsetLeft;
	if (mouseX <= canvasWidth - 10 && mouseX >= 10){ // Ef hringurinn er ekki kominn alveg til hægri eða vinstri
		playerXpostion = mouseX; // Hringurinn 'eltir' músina
	}

}); // EventListener 'hlustar' á eða fylgist með hreyfingu músins

var obstacles = [];  
var randomNumbers = [];
var obstacleSpace = -50;

for (var i = 0; i < 100; i++){ 
	var newObstacle = new create_obstacle(0, obstacleSpace, canvasWidth, 10); // Nýtt obstacle
	obstacleSpace -= 250; // Hvert nýtt obstacle verður 250px fyrir ofan fyrri obstacle
	obstacles.push(newObstacle); // Nýtt obstacle settur í Array
	randomNumbers.push(getRandomInt(60, canvasWidth - 250)); // Random tala sem fer í lista
}

function create_obstacle(x_postion, y_position, width, height){ // Fall sem býr til obstacle
	this.x_postion = x_postion,
	this.y_position = y_position,
	this.width = width,
	this.height = height
}    
function getRandomInt(min, max) { // Fall sem tekur inn lægstu oh hæstu tölu og finnur heila tölu á milli þeirra eða hæsta eða lægsta talan sjálf
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function render_obstacles(){
	for (var i = 0; i < obstacles.length; i++){
		if (obstacles[i].y_position >= canvasHeight){ // Ef obstacles fara útaf 
			context.clearRect(obstacles[i].x_postion, obstacles[i].y_position, obstacles[i].width, obstacles[i].height); 
		}
		else{
			context.fill(); // Fillir hringinn og obstalces með ákveðnum lit
			context.fillStyle = "#035c70"; // Litur fyrir context
			context.fillRect(obstacles[i].x_postion, obstacles[i].y_position += 1.5, obstacles[i].width, obstacles[i].height); // Obstacles að færast
			context.fillStyle = "#989e00"; // Nýr litur
			context.beginPath();
			context.arc(playerXpostion, playerYpostion, 10, 0, 2 * Math.PI, false); // Hringurinn að færast
			context.stroke();

			context.clearRect(randomNumbers[i], obstacles[i].y_position - 5, 100, 20); // Eyðir hluta af obstacle
		}
	}
}
function animation(){ // Fall fyrir hreyfingar
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	render_obstacles();
}
setInterval(animation, 5);