"use strict";


var game = document.getElementById("game");   
var canvas = document.getElementById("canvas");

var score = 0; // Byrjunar stig notanda
var obstacleHeight = 10; // Hæð á obstacles
var obstacles = []; // Listi sem mun halda öll obstacles
var obstacleSpace = -50; // Hvar fyrsti obstacle verður staddur lóðrétt


// "GAME OVER" texti
var div_message = document.createElement("div"); // Nýtt div element
div_message.setAttribute("class", "message"); // Div element fær classan message
var game_over_message = document.createTextNode("GAME OVER"); 
div_message.appendChild(game_over_message); // Div element fær texta

// "restart" takki
var div_restart = document.createElement("span"); // Nýtt span element
var restart_message = document.createTextNode("restart");
div_restart.setAttribute("class", "restartDiv"); // Span element fær classan restartDiv
div_restart.setAttribute("onClick", "window.location.reload()"); // Einning fær span element onclick sem refreshar síðuna
div_restart.appendChild(restart_message); // Span element fær texta

var context = canvas.getContext("2d");
var canvasWidth = context.canvas.width; 
var canvasHeight = context.canvas.height;

// Hérna er byrjunar staður notanda
var playerXpostion = 240; 
var playerYpostion = 820;

for (var i = 0; i < 100; i++){  // For loopa sem býr til 100 obstacles og lætur í obstacles listann
	var obstacleWidthLeft = getRandomInt(60, canvasWidth - 250); // Random tala. Þetta er fyrir bilið að vera á random stað.
	var obstacleWidthSpace = obstacleWidthLeft + 100; // Bilið er 100px
	var leftObstacle = new create_obstacle(0, obstacleSpace, obstacleWidthLeft, obstacleHeight); // Vinstri obstacle
	var rightObstacle = new create_obstacle(obstacleWidthSpace, obstacleSpace, canvasWidth, obstacleHeight); // Hægri obstacle
	obstacleSpace -= 250; // Hvert nýtt obstacle verður 250px fyrir ofan fyrri obstacle
	obstacles.push(leftObstacle); // Vinstri obstacle settur í Array
	obstacles.push(rightObstacle);  // Hægri obstacle settur í Array
}   


function create_obstacle(x_postion, y_position, width, height){ // Fall sem býr til obstacle
	this.x_postion = x_postion,
	this.y_position = y_position,
	this.width = width,
	this.height = height;
}
 
function getRandomInt(min, max) { // Fall sem tekur inn lægstu oh hæstu tölu og finnur heila tölu á milli þeirra eða hæsta eða lægsta talan sjálf
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function render_obstacles(){
	for (var i = 0; i < obstacles.length; i++){
		if (obstacles[i].y_position >= canvasHeight){
			obstacles.splice(i, 1);
		}
		if (playerXpostion + 15 >= obstacles[i].x_postion && playerXpostion <= obstacles[i].x_postion + obstacles[i].width && playerYpostion >= obstacles[i].y_position && playerYpostion <= obstacles[i].y_position + obstacles[i].height){ // Ef þegar notandinn klessir á obstacles
			game.appendChild(div_message); // "GAME OVER" texti birtist
			game.appendChild(div_restart); // "restart" takki birtist
			canvas.setAttribute("class", "game"); // Canvas fær classan game sem minnkar opacity
			clearInterval(animationInterval); // Stoppar Interval
		}
		context.fillStyle = "#035c70"; // Litur fyrir context
		context.fillRect(obstacles[i].x_postion, obstacles[i].y_position += 3.5, obstacles[i].width, obstacles[i].height); // Obstacles að færast
		context.fillStyle = "#989e00"; // Nýr litur
		context.beginPath();
		context.fillRect(playerXpostion, playerYpostion, 15, 15); // Hringurinn að færast
		context.stroke();
		context.fillStyle = "#ffffff";
		context.font = "50px Arial";
		context.fillText("Score: " + score, 20, 50); // Stig notanda               
	}
	score++; // Stiginn að hækka endalaust
}

function animation(){ // Fall fyrir hreyfingar
	context.clearRect(0, 0, canvasWidth, canvasHeight);
	render_obstacles();
}
var animationInterval = setInterval(animation, 10);

window.addEventListener("mousemove", function(e){ // EventListener 'hlustar' á eða fylgist með hreyfingu músins
	var mouseX = e.clientX - context.canvas.offsetLeft;
	if (mouseX <= canvasWidth - 10 && mouseX >= 10){ // Ef hringurinn er ekki kominn alveg til hægri eða vinstri
		playerXpostion = mouseX; // Hringurinn 'eltir' músina
	}
}); 
