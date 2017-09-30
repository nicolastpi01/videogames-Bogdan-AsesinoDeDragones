class Enemy extends Phaser.Sprite {

	constructor(game, x, y, sprite){
		super(game, x, y, sprite);

		game.physics.arcade.enable(this);

		game.add.existing(this);


		this.anchor.setTo(0.5);
		this.scale.set(1);

		this.body.inmovable = true;
		this.body.collideWorldBounds = true;


		this.init();
	}

	init(){}
	processMovement(){}

}

class Mummy extends Enemy{
	constructor(game, x, y, sprite){
		super(game, x, y, sprite);
	}

	init(){
		this.frame = 0;

		this.scale.set(-1, 1);

		this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 22, true);
		this.animations.play('walk');

		this.body.velocity.x = -100;
	}

	processMovement(){
		if (this.body.touching.right || this.body.blocked.right) {
      this.scale.set(-1, 1);
      this.body.velocity.x = -100;
    }
    else if (this.body.touching.left || this.body.blocked.left) {
    	this.scale.set(1);
      this.body.velocity.x = 100;
    }
	}
}

class Zombie extends Enemy{
	constructor(game, x, y, sprite){
		super(game, x, y, sprite);
	}

	init(){
		this.frame = 9;

		this.animations.add('walk-left', [9, 10, 11], 10, true);
		this.animations.add('walk-right', [18, 19, 20], 10, true);
		
		this.animations.play('walk-left');

		this.body.velocity.x = -50;
	}

	processMovement(){
		if (this.body.touching.right || this.body.blocked.right) {
			this.animations.play('walk-left');
      		this.body.velocity.x = -50;
    	}
    	else if (this.body.touching.left || this.body.blocked.left) {
    		this.animations.play('walk-right');
      		this.body.velocity.x = 50;
    	}
	}

}

class Skeleton extends Enemy{
	constructor(game, x, y, sprite){
		super(game, x, y, sprite);
	}

	init(){
		this.frame = 12;

		this.animations.add('walk-left', [12, 13, 14, 15, 16, 17], 10, true);
		this.animations.add('walk-right', [21, 22, 23, 24, 25, 26], 10, true);
		
		this.animations.play('walk-left');

		this.body.velocity.x = 100;
	}

	processMovement(){
		if (this.body.touching.right || this.body.blocked.right) {
			this.animations.play('walk-left');
      	this.body.velocity.x = -100;
    	}
    	else if (this.body.touching.left || this.body.blocked.left) {
    		this.animations.play('walk-right');
     		this.body.velocity.x = 100;
    	}
	}
}

class Dragon extends Enemy{
	constructor(game, x, y, sprite){
		super(game, x, y, sprite);
	}

	init(){
		this.frame = 12;

		this.body.allowGravity = false;

		this.animations.add('fly-left', [11, 10, 9, 8, 7, 6], 15, true);
		this.animations.add('fly-right', [0, 1, 2, 3, 4, 5], 15, true);
		
		this.animations.play('fly-left');

		this.body.velocity.x = -100;
	}

	processMovement(){
		if (this.body.touching.right || this.body.blocked.right) {
			this.animations.play('fly-left');
      		this.body.velocity.x = -100;
    	}
    	else if (this.body.touching.left || this.body.blocked.left) {
    		this.animations.play('fly-right');
      		this.body.velocity.x = 100;
    	}
	}
}

class Slime extends Enemy{
	constructor(game, x, y, sprite){
		super(game, x, y, sprite);
	}

	init(){
		this.frame = 20;

		this.body.gravity.y = 1000;
		this.body.maxVelocity.y = 1000;
		this.body.allowGravity = true;

		this.animations.add('jump', [21, 22, 23, 24, 25, 26, 27, 28, 29], 15, true);
		
		this.animations.play('jump');
	}

	processMovement(){
		if(this.body.onFloor() || this.body.touching.down){
			this.body.velocity.y = -450;
		}
	}
}