class BDragon extends Enemy{
	constructor(game, x, y, sprite){
		super(game, x, y, sprite);
	}

	init(){
		this.frame = 0;

		//this.scale.set(-1, 1);

		//this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 22, true);
		//this.animations.play('walk');

		this.body.velocity.x = -100;
		this.body.setSize(25, 42, 7, 2);
	}

	processMovement(){
	if(false){
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
}
