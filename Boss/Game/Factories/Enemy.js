class Enemy extends Phaser.Sprite {

	constructor(game, x, y, sprite){
		super(game, x, y, sprite);

		game.physics.arcade.enable(this);

		game.add.existing(this);

		this.life;
		this.value;
		
		this.emitter = this.createEmitter(this.x, this.y);

		this.anchor.setTo(0.5);
		this.scale.set(1);

		this.body.inmovable = true;
		this.body.collideWorldBounds = true;


		this.init();
	}

	update(){
		game.physics.arcade.collide(this, layer);
		if(this.inCamera){
			if(this.body.velocity.x == 0){ this.updateBodyVelocity(); }
			game.physics.arcade.collide(this, walls);
			this.processMovement();
		}else{
			this.body.velocity.x = 0
			this.animations.stop();
		}
		game.physics.arcade.collide(this.emitter, layer);
	}

	hit(){
		this.emitter.x = this.x;
		this.emitter.y = this.y;

		this.life -= 1;
		this.emitter.start(true, 2000, null, 5);

		if(this.life == 0){
			this.kill();
			this.emitter.start(true, 2000, null, 10);
		}
	}

	createEmitter(x, y){
        var emitter = game.add.emitter(0, 0, 100);
        emitter.makeParticles('pixel_red');
        emitter.gravity = 200;
        emitter.x = x;
        emitter.y = y;

        return emitter;
    }

	init(){}
	processMovement(){}
	updateBodyVelocity(){}

}

class Mummy extends Enemy{
	constructor(game, x, y, sprite){
		super(game, x, y, sprite);
	}

	init(){
		this.life = 2;
		this.value = 30;

		this.frame = 0;

		this.scale.set(-1, 1);

		this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 22, true);
		//this.animations.play('walk');

		this.body.velocity.x = 0;
		//this.body.velocity.x = -100;
		this.body.setSize(25, 42, 7, 2);
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

	updateBodyVelocity(){
		if(this.facing>0){
			this.scale.set(-1, 1);
			this.body.velocity.x = -100;	
		}else{
			this.scale.set(1);	
			this.body.velocity.x = 100;	
		}
		this.animations.play('walk');			
	}
}

class Zombie extends Enemy{
	constructor(game, x, y, sprite){
		super(game, x, y, sprite);
	}

	init(){
		this.life = 2;
		this.value = 35;

		this.frame = 9;

		this.animations.add('walk-left', [9, 10, 11], 10, true);
		this.animations.add('walk-right', [18, 19, 20], 10, true);
		
		//this.animations.play('walk-left');

		this.body.velocity.x = 0;
		//this.body.velocity.x = -50;
		this.body.setSize(20, 33, 5, 29);
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

	updateBodyVelocity(){
		if(this.facing>0){
			this.animations.play('walk-left');
			this.body.velocity.x = -50;
		}else{
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
		this.life = 1;
		this.value = 15;

		this.frame = 12;

		this.animations.add('walk-left', [12, 13, 14, 15, 16, 17], 10, true);
		this.animations.add('walk-right', [21, 22, 23, 24, 25, 26], 10, true);
		
		//this.animations.play('walk-left');

		this.body.velocity.x = 0;
		//this.body.velocity.x = -100;
		this.body.setSize(20, 45, 7, 18);
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

	updateBodyVelocity(){
		if(this.facing>0){
			this.animations.play('walk-left');
			this.body.velocity.x = -100;
		}else{
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
		this.life = 3;
		this.value = 50;

		this.frame = 12;

		this.body.allowGravity = false;

		this.animations.add('fly-left', [11, 10, 9, 8, 7, 6], 15, true);
		this.animations.add('fly-right', [0, 1, 2, 3, 4, 5], 15, true);
		
		//this.animations.play('fly-left');

		this.body.velocity.x = 0;
		//this.body.velocity.x = -100;
		this.body.setSize(90, 34, 0, 25);
	}

	processMovement(){

		if( this.inCamera && this.life>=0 && false){
			if(!game.dragonrespirando.isplaying) game.dragonrespirando.resume();
		}
		else
			game.dragonrespirando.pause();

		if (this.body.touching.right || this.body.blocked.right) {
			this.animations.play('fly-left');
      		this.body.velocity.x = -100;
      		game.dragonrespirando.play();
    	}
    	else if (this.body.touching.left || this.body.blocked.left) {
    		this.animations.play('fly-right');
      		this.body.velocity.x = 100;
      		game.dragonrespirando.play();
    	}
	}

	updateBodyVelocity(){
		if(this.facing>0){
			this.animations.play('fly-left');
			this.body.velocity.x = -100;
		}else{
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
		this.life = 1;
		this.value = 5;

		this.frame = 20;

		this.body.gravity.y = 1000;
		this.body.maxVelocity.y = 1000;
		this.body.allowGravity = true;

		this.body.setSize(15, 15, 8, 16);

		this.animations.add('jump', [21, 22, 23, 24, 25, 26, 27, 28, 29], 15, true);
		
		//this.animations.play('jump');

		this.body.velocity.x = 0;
	}

	processMovement(){
		if(this.body.onFloor() || this.body.touching.down){
			this.body.velocity.y = -450;
		}
	}

	updateBodyVelocity(){
		this.animations.play('jump');
	}
}

class Monster extends Enemy{
	constructor(game, x, y, sprite){
		super(game, x, y, sprite);
	}

	init(){
		this.life = 2;
		this.value = 25;

		this.frame = 0;

		this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 22, true);
		//this.animations.play('walk');

		this.body.velocity.x = 0;
		//this.body.velocity.x = -100;
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

	updateBodyVelocity(){
		if(this.facing>0){
			this.scale.set(-1, 1);
			this.body.velocity.x = -100;	
		}else{
			this.scale.set(1);	
			this.body.velocity.x = 100;	
		}
		this.animations.play('walk');	
	}

}