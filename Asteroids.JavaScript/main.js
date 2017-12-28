//Main javaScript file that is executed in the body of the HTML file
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

//Canvas Constants
var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

//Maths constants
var PI = 3.14159265359;

//Game Constants
var STARTING_ASTEROIDS = 10;
var STARTING_ASTEROIDS_OFFSET = 30;

var STATE_SPLASH = 0;
var STATE_PAUSE = 1;
var STATE_GAME_OVER = 2;
var STATE_GAME = 3;

//States varaiable
var gameState = STATE_SPLASH;

var STARTING_LIVES = 3;
var LIVES_OFFSET = 30;

//Background
var background = document.createElement("img");
background.src = "Sprites/back_ground.png";

//Troll
//var troll = document.createElement("img");
//troll.src = "Sprites/troll_face.png"

//Game Objects
////Splash Screen
var splashScreen = document.createElement("img");
splashScreen.src = "Sprites/splash.png";

var pauseScreen = document.createElement("img");
pauseScreen.src = "Sprites/paused.png";

var gameOverScreen = document.createElement("img");
gameOverScreen.src = "Sprites/game_over.png";

////Gameplay
var asteroids = [];
var player;
setUpGame();

////UI ELEMENTS
var lifeCount = STARTING_LIVES;
var lives = [];
for(var i = 0; i < STARTING_LIVES; i++){
	var lifeUI = document.createElement("img");
	lifeUI.src = "Sprites/ship_small.png";
	lives.push(lifeUI);
}

//Events Listener
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

update();