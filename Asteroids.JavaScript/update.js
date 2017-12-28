function update(){
	var deltaTime = getDeltaTime();

	//Draw background
	context.drawImage(background, 0, 0);

	switch(gameState){

		case STATE_SPLASH:
		//Splash screen logic
		splashStateUpdate();
		break;

		case STATE_GAME://State = STATE_GAME;
		gameStateUpdate(deltaTime);
		break;

		case STATE_PAUSE:
		//Paused screen logic
		pauseStateUpdate();
		break;

		case STATE_GAME_OVER:
		//Game over screen logic
		gameOverStateUpdate();
		break;

	}
	
	requestAnimationFrame(update);
}

function splashStateUpdate(){
	//Draw the splash screen
	context.drawImage(splashScreen, (SCREEN_WIDTH/2)-(splashScreen.width/2), (SCREEN_HEIGHT/2)-(splashScreen.height/2));
}

function pauseStateUpdate(){
	context.drawImage(pauseScreen, (SCREEN_WIDTH/2)-(pauseScreen.width/2), (SCREEN_HEIGHT/2)-(pauseScreen.height/2));
}

function gameOverStateUpdate(){
	context.drawImage(gameOverScreen, (SCREEN_WIDTH/2)-(gameOverScreen.width/2), (SCREEN_HEIGHT/2)-(gameOverScreen.height/2));
}

function gameStateUpdate(deltaTime){
	//Check for end of game
	if(lifeCount == 0){
		gameState = STATE_GAME_OVER;
		return;
	}

	//Check Collisions
	checkCollisions();
	deathRow();
	
	//Run gameLogic and Draw
	//Draw bullets
	for(var i = 0; i < player.bullets.length; i++){
		player.bullets[i].update();
		player.bullets[i].draw();
	}
	player.deadBullet();
	
	//Asteroids
	for(var i = 0; i < asteroids.length; i++){
		asteroids[i].update();
		asteroids[i].draw();
	}	
	//update and draw player
	player.update(deltaTime);
	player.draw(deltaTime);

	//Draw UI
	for(var i = 0; i < lifeCount; i++){
		if(lives[i].complete){
			//Draw life indicators/ui
			context.drawImage(lives[i], LIVES_OFFSET + (lives[i].width * i), LIVES_OFFSET);
		}
	}
}

function setUpGame(){
	//Game Objects
	for(var i = 0; i < STARTING_ASTEROIDS; i++){
		var coinFlip = Math.random();
		if(coinFlip > 0.5){
			//Spawn at the top
			asteroids.push(createAsteroid(Math.random() * SCREEN_WIDTH, 0 + STARTING_ASTEROIDS_OFFSET, "large"));
			asteroids[asteroids.length - 1].setup();
		}else{
			//Spawn at the bottom;
			asteroids.push(createAsteroid(Math.random() * SCREEN_WIDTH, SCREEN_HEIGHT - STARTING_ASTEROIDS_OFFSET, "large"));
			asteroids[asteroids.length - 1].setup();
		}
	}
	
	player = createPlayer(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, "Sprites/ship.png");
	player.setup();
}