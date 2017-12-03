class BDragon extends Enemy{
	constructor(game, x, y, sprite){
		super(game, x, y, sprite);
	}

	init(){
		this.frame = 0;
		this.body.allowGravity = true;
		//this.scale.set(-1, 1);
		this.animations.add('idledragon', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
		this.animations.play('idledragon');
		this.scale.set(1.5);
		this.body.velocity.x = 0;
		//this.body.setSize(0,0, 80,100);
	}

	processMovement(){
	if(false){
		if (this.body.touching.right || this.body.blocked.right) {
      		this.scale.set(-1,1);
      		this.body.velocity.x = -100;
    	}
    	else if (this.body.touching.left || this.body.blocked.left) {
    		this.scale.set(1);
      		this.body.velocity.x = 100;
    	}
    }

	}
}
