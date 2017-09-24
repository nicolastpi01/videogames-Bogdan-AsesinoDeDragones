Enemy = function(game, x, y, sprite) {

	Phaser.Sprite.call(this, game, x, y, sprite);

	game.physics.arcade.enable(this);

	game.add.existing(this);
	

	this.frame = 0;

	this.anchor.setTo(0.5);
	this.scale.set(-1, 1);

	this.body.inmovable = true;

	this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 22, true);
	this.animations.play('walk');

	this.body.velocity.x = -100;

	this.processMovement = function(){
		if (this.body.touching.right || this.body.blocked.right) {
      this.scale.set(-1, 1);
      this.body.velocity.x = -100;
    }
    else if (this.body.touching.left || this.body.blocked.left) {
    	this.scale.set(1);
      this.body.velocity.x = 100;
    }
	};

};


Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;