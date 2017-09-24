Knight = function(game, x, y, sprite){

	Phaser.Sprite.call(this, game, x, y, sprite);

	game.physics.arcade.enable(this);

	game.add.existing(this);

	//-------------------------------------------------------

	this.life = 100;

	this.canDoubleJump = true;

	this.frame = 0;

	this.scale.setTo(0.7);
	this.anchor.setTo(0.5);

	this.body.gravity.y = 1000;
	this.body.maxVelocity.y = 1000;
	this.body.allowGravity = true;
	this.body.collideWorldBounds = true;

	this.animations.add('walk', [0, 1, 2, 3], 10, true);
	this.animations.add('jump', [4], 10, true);
	this.animations.add('attack', [4, 5, 6, 7], 25, true);


	//-------------------------------------------------------

	this.processInput = function(cursors, spacebar, ctrl){
		if (cursors.left.isDown){
	    this.body.x += -5;
	    this.scale.x = -0.7;
	    this.playAnimation('walk');
	  }
	  else if (cursors.right.isDown){
	    this.body.x += 5;
	    this.scale.x = 0.7;
	    this.playAnimation('walk');
	  }
	  else if(ctrl.isDown){
	  	this.animations.play('attack');
	  }
	  else{
	  	this.animations.stop();
	  }


	  spacebar.onDown.add(this.processJump, this);
	};

	this.processJump = function(){
		this.animations.stop();
		this.animations.play('jump');

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
		if(!this.isJumping()){
			this.canDoubleJump = true;
		}
	}

	this.playAnimation = function(animation){
		if(!this.isJumping()){
			this.animations.play(animation);
		}
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