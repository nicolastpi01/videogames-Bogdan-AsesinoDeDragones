Knight = function(game, x, y, sprite){

	Phaser.Sprite.call(this, game, x, y, sprite);

	game.physics.arcade.enable(this);

	game.add.existing(this);

	//-------------------------------------------------------

	this.life = 100;

	this.canDoubleJump = true;

	this.frame = 2;

	this.scale.setTo(2);
	this.anchor.setTo(0.5);

	this.body.gravity.y = 1000;
	this.body.maxVelocity.y = 1000;
	this.body.allowGravity = true;
	this.body.collideWorldBounds = true;

	this.animations.add('walk', [12, 13, 14, 15, 16, 17], 10, true);
	this.animations.add('attack', [42, 43, 44], 10, true);


	//-------------------------------------------------------

	this.processInput = function(cursors, spacebar){
		if (cursors.left.isDown){
	    this.body.x += -5;
	    this.scale.setTo(-2, 2);
	    this.animations.play('walk');
	  }
	  else if (cursors.right.isDown){
	    this.body.x += 5;
	    this.scale.setTo(2);
	    this.animations.play('walk');
	  }else{
	  	this.animations.stop();
	  }

	  spacebar.onDown.add(this.processJump, this);
	};

	this.processJump = function(){
		if(!this.isJumping()){
			this.jump(-600);
		}else{
			this.trySecondJump();
		}

		this.resetDoubleJump();
	};

	this.isJumping = function(){
		return !(this.body.onFloor() || this.body.touching.down);
	};

	this.jump = function(velocity){
		this.body.velocity.y = velocity;
	}

	this.trySecondJump = function(){
		if(this.canDoubleJump){
			this.canDoubleJump = false;
			this.jump(-600);
		}
	}

	this.resetDoubleJump = function(){
		if(this.body.onFloor()){this.canDoubleJump = true;}
	}

	this.bounce = function(){
		this.jump(-200);
	};

	this.bounceBack = function(){
		if (this.body.touching.right || this.body.blocked.right) {
			this.x -= 25;
    }
    else if (this.body.touching.left || this.body.blocked.left) {
    	this.x += 25;
    }
	};

	this.isDead = function(){
		return this.life <= 0;
	};

};

Knight.prototype = Object.create(Phaser.Sprite.prototype);
Knight.prototype.constructor = Knight;