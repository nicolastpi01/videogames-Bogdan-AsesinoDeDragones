Enemy = function(game, x, y, sprite) {

	Phaser.Sprite.call(this, game, x, y, sprite);

	game.physics.arcade.enable(this);

	game.add.existing(this);

	this.x = x;
	this.y = y;

	this.frame = 0;

	this.anchor.setTo(0.5);
	this.scale.set(1);

	this.body.inmovable = true;

	this.animations.add('walk', [20, 21, 22, 23, 24, 25, 26, 28, 29], 15, true);
	this.animations.play('walk');

	this.body.velocity.x = -100;

	


	//this.tween1 = game.add.tween(this);

	//this.tween1.to({x: this.x -= 250}, 3000, Phaser.Easing.Linear.None);
	//this.tween1.to({x: this.x += 250}, 3000, Phaser.Easing.Linear.None);
	//this.tween1.to({x: this.x += 250}, 3000, Phaser.Easing.Linear.None);
	//this.tween1.to({x: this.x -= 250}, 3000, Phaser.Easing.Linear.None);
	
	//this.tween1.loop();
	//this.tween1.start();
};



Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;