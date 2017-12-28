//Player Constants
var PLAYER_ACCELERATION = 0.45;
var PLAYER_TURN_SPEED = 0.1;
var PLAYER_MAX_VEL = 7;
var PLAYER_IMMUNE_TIME = 3;
var PLAYER_IMMUNE_FLASH_RATE = 0.05;

var BULLET_SPEED = 20.0;
var BULLET_MAX = 5;

function createBullet(){
	return{
		//Define the properties of a bullet
		x: 0,
		y: 0,
		velX: 0,
		velY: 0,
		width: 0,
		height: 0,
		sprite: document.createElement("img"),
		set: false,
		isDead: true,

		setup: function(){
			this.sprite.src = "Sprites/bullet.png";
		},

		update: function(){
			this.x += this.velX;
			this.y += this.velY;
		},

		draw: function(){
			//Make sure that the sprite has loaded before we fetch the width and height
			if(this.sprite.complete && this.set == false){
				this.width = this.sprite.width;
				this.height = this.sprite.height;
				this.set = true;
			}else if(this.set == true){
				context.drawImage(this.sprite, this.x - (this.width/2), this.y - (this.height/2));
			}
		},
	};
}

function createPlayer(a_posX, a_posY, a_fileName){
	return{
		//Member variables
		x: a_posX,
		y: a_posY,
		width: 0,
		height: 0,
		set: false,
		velX: 0,
		velY: 0,
		rot: PI,
		sprite: document.createElement("img"),
		accelerating: false,
		turnLeft: false,
		turnRight: false,
		shooting: false,
		bullets: [], 
		fireRate: 0.5,
		fireTimer: 0,
		collisionImmune: false,
		collisonTimer: 0,
		flashEffectTimer: 0,

		//Member function
		setup: function(){
			this.sprite.src = a_fileName;
		},

		update: function(deltaTime){
			
			if(this.accelerating){
				var sin = Math.sin(this.rot);
				var cos = Math.cos(this.rot);
				var X = 0;   
				var Y = 1;
				this.velX += (X * cos) - (Y * sin) * PLAYER_ACCELERATION;
				this.velY += (X * sin) + (Y * cos) * PLAYER_ACCELERATION;
				
				//Limit max Velocity
				var magnitude = Math.sqrt((this.velX*this.velX) + (this.velY*this.velY));
				if(magnitude > PLAYER_MAX_VEL){
					this.velX = (this.velX / magnitude) * PLAYER_MAX_VEL;
					this.velY = (this.velY / magnitude) * PLAYER_MAX_VEL;
				}
			}
			if(this.turnLeft){
				this.rot -= PLAYER_TURN_SPEED;
			}
			if(this.turnRight){
				this.rot += PLAYER_TURN_SPEED;
			}
			this.fireTimer += deltaTime;
				if(this.shooting){
					if(this.fireTimer > this.fireRate && this.bullets.length < BULLET_MAX){
						this.shoot();
						this.fireTimer -= this.fireTimer;
					}	
				}	

			if(this.collisionImmune == true){
				this.collisonTimer += deltaTime;
				if(this.collisonTimer >= PLAYER_IMMUNE_TIME){
					this.collisonTimer -= this.collisonTimer;
					this.collisionImmune = false;
				}
			}
			
			this.velX *= 0.9935;
			this.velY *= 0.9935;
			
			this.x += this.velX;
			this.y += this.velY;
		},

		draw: function(deltaTime){
			loopObject(this);
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
					if(this.collisionImmune == true && gameState == STATE_GAME){
						//Apply flash effect
						this.flashEffectTimer += deltaTime;
						if(this.flashEffectTimer >= PLAYER_IMMUNE_FLASH_RATE){
							context.drawImage(this.sprite, -(this.width/2), -(this.height/2));
							this.flashEffectTimer -= this.flashEffectTimer
						}
					}else{
						context.drawImage(this.sprite, -(this.width/2), -(this.height/2));
					}
				context.restore();
			}
		},

		shoot: function(){
			//Create a bullet
			var bullet = createBullet();
			bullet.setup();

			//Set its position 
			bullet.x = this.x;
			bullet.y = this.y;
			
			//Set its velocity
			var X = 0;
			var Y = 1;
			var sin = Math.sin(this.rot); 
			var cos = Math.cos(this.rot);
			var dirX = ((X *cos) - (Y * sin));
			var dirY = ((X * sin) + (Y * cos));

			bullet.velX = dirX * BULLET_SPEED;
			bullet.velY = dirY * BULLET_SPEED; 

			//Inherit player velocity
			bullet.velX += this.velX;
			bullet.velY += this.velY;

			//Push it into the players bullet array
			this.bullets.push(bullet);
		},

		loseLife: function(){
			//Reset the players position
			this.x = SCREEN_WIDTH / 2;
			this.y = SCREEN_HEIGHT / 2;
			//Reset the velocity
			this.velX = 0;
			this.velY = 0;
			//Reset button presses
			this.accelerating = false;
			this.turnLeft = false;
			this.turnRight = false;
			this.shooting = false;
			//Reset rotation
			this.rot = PI;
			//Remove life
			lifeCount--;
		 	//make player immune
		 	this.collisionImmune = true;

		},

		deadBullet: function(){
			for(var i=0; i<this.bullets.length; i++){
				//Check if the bullets have gone out of the screen boundaries
				//If so kill it
				if(this.bullets[i].x - this.bullets[i].width/2 < 0 ||
					this.bullets[i].x + this.bullets[i].width/2 > SCREEN_WIDTH ||
					this.bullets[i].y - this.bullets[i].height/2 < 0||
					this.bullets[i].y + this.bullets[i].height/2 > SCREEN_HEIGHT)
				{
					this.bullets.splice(i,1);
					return;
				}
			}
		},
	};
}