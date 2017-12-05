class BDragon extends Enemy{
	constructor(game, x, y, sprite){
		super(game, x, y, sprite);
	}

	init(){
		this.value = 100;
		this.frame = 0;
		this.life = 10;

		this.body.allowGravity = false;
		//this.scale.set(-1, 1);

		//Casi le atine. Hace falta moverlo con una aplicacion mejor que paint
		this.animations.add('dragonlevantavuelo', [0, 1, 2], 9, true);
		this.animations.add('dragonvuelo', [3, 4, 5, 6, 7], 12, true);
		this.animations.add('dragonterminavuelo', [8,9,10], 8, true);
		
		this.animations.play('dragonlevantavuelo');

		//this.animations.add('idledragon', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
		//this.animations.play('idledragon');
		this.scale.set(1.5);
		this.body.velocity.x = 0;
		//this.body.setSize(0,0, 80,100);
	}

	processMovement(){
		//Logre hacerlo funcionar, pero no me gusta el cambio abrupto. Comenzare a tocar el volumen la prox
		if( this.inCamera && this.life>=0){
			if(!game.bostezo.isplaying) game.bostezo.resume();
		}
		else
			game.bostezo.pause();
		
	if(true){
		if (this.body.touching.right || this.body.blocked.right) {
			//Moverse izquierda
      		this.scale.set(-1.5,1.5);
      		this.body.velocity.x = -100;
    	}
    	else if (this.body.touching.left || this.body.blocked.left) {
    		//Moverse derecha
    		this.scale.set(1.5);
      		this.body.velocity.x = 100;
    	}
    }

	}
}
