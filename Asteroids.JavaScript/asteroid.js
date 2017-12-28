//Move Speeds
var ASTEROID_LARGE_SPEED = 0.5;
var ASTEROID_MEDIUM_SPEED = 0.95;
var ASTEROID_SMALL_SPEED = 4.0;
//Rotation Speeds
var ASTEROID_LARGE_ROTATION_SPEED = 0.01;
var ASTEROID_MEDIUM_ROTATION_SPEED = 0.025;
var ASTEROID_SMALL_ROTATION_SPEED = 0.05;


function createAsteroid(a_posX, a_posY, a_type){
	//randomize velocity
	var randX = (Math.random()*2) - 1; // returns a number between -1 and 0.99999*
	var randY = (Math.random()*2) - 1;
	//Now we are going to normalize the vector to get just the direction from the random vector
	var magnitude = Math.sqrt((randX*randX) + (randY*randY));
	var normalizedX = randX / magnitude;
	var normalizedY = randY / magnitude;
	//The new magnitude of out normalized X and Y  is 1, this is really handy :)
	return{
		//Member variables
		x: a_posX,
		y: a_posY,
		width: 0,
		height: 0,
		set: false,
		velX: normalizedX,
		velY: normalizedY,
		rot: Math.random() * (2*PI), //Random rotation between 0 and 360 deg
		type: a_type,
		sprite: document.createElement("img"),

		//Member functions
		setup: function(){
			switch (this.type){
				case "large":
					this.sprite.src = "Sprites/rock_large.png";
					break;
				
				case "medium":
					this.sprite.src = "Sprites/rock_medium.png";
					break;
				
				case "small":
					this.sprite.src = "Sprites/rock_small.png";
					break;
			}
		},

		update: function(){
			switch (this.type){
				case "large":
					this.x += this.velX * ASTEROID_LARGE_SPEED;
					this.y += this.velY * ASTEROID_LARGE_SPEED;
					this.rot += ASTEROID_LARGE_ROTATION_SPEED;
					break;
				
				case "medium":
					this.x += this.velX * ASTEROID_MEDIUM_SPEED;
					this.y += this.velY * ASTEROID_MEDIUM_SPEED;
					this.rot += ASTEROID_MEDIUM_ROTATION_SPEED;
					break;
				
				case "small":
					this.x += this.velX * ASTEROID_SMALL_SPEED;
					this.y += this.velY * ASTEROID_SMALL_SPEED;
					this.rot += ASTEROID_SMALL_ROTATION_SPEED;
					break;
			}
		},

		draw: function(){
			loopObject(this)
			//Make sure the sprite has loaded before we fetch the width and height
			if(this.sprite.complete && this.set == false){
				this.width = this.sprite.width;
				this.height = this.sprite.height;
				this.set = true;
			}else if(this.set == true){
				//Rotate and draw the asteroid to the screen
				context.save();
					context.translate(this.x, this.y);
					context.rotate(this.rot);
					context.drawImage(this.sprite, -(this.width/2), -(this.height/2));
				context.restore();
			}		
		},
	};
}