Knight = function(game, x, y, sprite){

	Phaser.Sprite.call(this, game, x, y, sprite);

	game.physics.arcade.enable(this);

	game.add.existing(this);

	//-------------------------------------------------------

	this.life = 555;

	this.frame = 2;

	this.scale.setTo(2);
	this.anchor.setTo(0.5);

	this.body.gravity.y = 1000;
	this.body.maxVelocity.y = 1000;
	this.body.allowGravity = true;
	this.body.collideWorldBounds = true;

	this.animations.add('walk', [12, 13, 14, 15, 16, 17], 10, true);

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

	  if (spacebar.isDown && (this.body.onFloor() || this.body.touching.down)){
	  	this.body.velocity.y = -600;
	  }
	};

	this.bounce = function(){
		this.body.velocity.y = -200;
	};

};

Knight.prototype = Object.create(Phaser.Sprite.prototype);
Knight.prototype.constructor = Knight;