class Knight extends Phaser.Sprite {

	constructor(game, x, y, sprite){
		super(game, x, y, sprite);

		game.physics.arcade.enable(this);

		game.add.existing(this);

		this.init();
	}

	init(){
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
	}

	//-------------------------------------------------------

	processInput(cursors, spacebar, ctrl){
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
	}

	processJump(){
		this.animations.stop();
		this.animations.play('jump');

		if(!this.isJumping()){
			this.jump(-600);
		}else{
			this.trySecondJump();
		}

		this.resetDoubleJump();
	}

	isJumping(){
		return !(this.body.onFloor() || this.body.touching.down);
	}

	jump(velocity){
		this.body.velocity.y = velocity;
	}

	trySecondJump(){
		if(this.canDoubleJump){
			this.canDoubleJump = false;
			this.jump(-600);
		}
	}

	resetDoubleJump(){
		if(!this.isJumping()){
			this.canDoubleJump = true;
		}
	}

	playAnimation(animation){
		if(!this.isJumping()){
			this.animations.play(animation);
		}
	}

	bounce(){
		this.jump(-200);
	}

	bounceBack(){
		if (this.body.touching.right || this.body.blocked.right) {
			this.x -= 25;
    }
    else if (this.body.touching.left || this.body.blocked.left) {
    	this.x += 25;
    }
	}

	isDead(){
		return this.life <= 0;
	}

}