var KEY_SPACE = 32;
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_ENTER = 13;

var KEY_PAUSE = 80;
var KEY_ESC = 27;
var KEY_RESET = 82;
var KEY_MAIN = 77;

var startFrameMilliseconds = performance.now();
var endFrameMilliseconds = performance.now();

function getDeltaTime()
{
	endFrameMilliseconds = startFrameMilliseconds;
	startFrameMilliseconds = performance.now();
	
	var deltaTime = (startFrameMilliseconds - endFrameMilliseconds) * 0.001;
	
	if(deltaTime > 1)
	{
		deltaTime = 1;
	}
	
	return deltaTime;
}

function loopObject(object){
	//Check for x axis
			if(object.x + object.width/2 < 0)
			{
				//Player has gone off left hand side of screen
				object.x = canvas.width + object.width/2;
			}
			if(object.x - object.width/2 > canvas.width)
			{
				object.x = 0 - object.width/2;
			}
			//Check for y axis
			if(object.y + object.height/2 < 0)
			{
				//Player has gone off left hand side of screen
				object.y = canvas.height + object.height/2;
			}
			if(object.y - object.height/2 > canvas.height)
			{
				object.y = 0 - object.height/2;
			}
}

function onKeyUp(){
	var currentKey = event.keyCode;
	//console.log(currentKey);
	//Move player up
	if(currentKey == KEY_UP)
	{
		player.accelerating = false;
	}

	//Move player left
	if(currentKey == KEY_LEFT)
	{
		player.turnLeft = false;
	}

	//Move player right
	if(currentKey == KEY_RIGHT)
	{
		player.turnRight = false;
	}
	//Shoot bullet
	if(currentKey == KEY_SPACE)
	{
		player.shooting = false;
	}
}

function onKeyDown(event){
	var currentKey = event.keyCode;
	//console.log(currentKey);
	//Move player up
	if(currentKey == KEY_UP)
	{
		player.accelerating = true;
	}

	//Move player left
	if(currentKey == KEY_LEFT)
	{
		player.turnLeft = true;
	}

	//Move player right
	if(currentKey == KEY_RIGHT)
	{
		player.turnRight = true;
	}
	
	//Shoot bullet
	if(currentKey == KEY_SPACE)
	{
		player.shooting = true;
	}
	
	if(currentKey == KEY_ENTER && gameState == STATE_SPLASH){
		gameState = STATE_GAME;
	}

	if(currentKey == KEY_PAUSE && gameState == STATE_GAME){
		gameState = STATE_PAUSE;
	}

	if(currentKey == KEY_ESC && gameState == STATE_PAUSE){
		gameState = STATE_GAME;
	}

	if(currentKey == KEY_RESET){
		location.reload();
	}

	if(currentKey == KEY_MAIN){
		location.reload();
	}

}

function checkCollisions(){
	//Check astroids colliding with the bullets
	for(var i = 0; i < asteroids.length; i++){
		for(var j = 0; j < player.bullets.length; j++){
			if(player.bullets[j].y + player.bullets[j].height < asteroids[i].y || 
				player.bullets[j].x + player.bullets[j].width < asteroids[i].x ||
				player.bullets[j].x > asteroids[i].x + asteroids[i].width ||
				player.bullets[j].y > asteroids[i].y + asteroids[i].height){
				//No collision if any of these are true!!!!
			}else{
				//We have collided
				//remove the bullet
				player.bullets.splice(j,1);
				switch(asteroids[i].type){
					case "large":
						for(var k = 0; k < 3; k++){
							var medAsteroid = createAsteroid(asteroids[i].x, asteroids[i].y, "medium");
							medAsteroid.setup();
							asteroids.push(medAsteroid)
						}
						asteroids.splice(i,1);
						return;
						//Create more asteroids of a lesser type
						
					case "medium":
						for(var k = 0; k < 3; k++){
							var smlAsteroid = createAsteroid(asteroids[i].x, asteroids[i].y, "small");
							smlAsteroid.setup();
							asteroids.push(smlAsteroid)
						}
						asteroids.splice(i,1);
						return;
						//Create 3 more asteroids of a lesser type
					
					case "small":
						asteroids.splice(i,1);
						return;
						//Remove it from the array
						
					}
				}
			}
		}
	}

function deathRow(){
	//Check asteroids and bullets
	if(player.collisionImmune == false){

		//Loop through our asteroids
		for(var i = 0; i < asteroids.length; i++){
			if(player.y + (player.height/4) < asteroids[i].y ||
				player.x + (player.width/4) < asteroids[i].x ||
				player.x > asteroids[i].x + asteroids[i].width ||
				player.y > asteroids[i].y + asteroids[i].height){
				//Have not collided
			}else{
				//We have a collison
				//We need to reset our player!
				player.loseLife();
			}
		}
	}
}