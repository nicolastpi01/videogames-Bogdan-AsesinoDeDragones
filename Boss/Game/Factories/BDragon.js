var gdragon;

class BDragon extends Enemy{
	constructor(game, x, y, sprite){
		super(game, x, y, sprite);
		gdragon = this;
	}

	init(){
		this.value = 100;
		this.frame = 0;
		this.life = 10;
		this.contador = 1;
		this.veces = 3;
		this.body.allowGravity = true;
		//this.scale.set(-1, 1);
		//Casi le atine. Hace falta moverlo con una aplicacion mejor que paint
		this.animations.add('dragonlevantavuelo', [0, 1, 2], 9, true);
		this.animations.add('dragonvuelo', [3, 4, 5, 6, 7], 18, true);
		this.animations.add('dragonterminavuelo', [8,9,10], 8, true);
		this.events.onAnimationLoop.add(this.update_animacion,this); //Era otra la funcion, ya funciona!
		this.animations.play('dragonlevantavuelo');
        this.animations.updateIfVisible = false;
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

    update_animacion(a,b){
    	if(this.animations.frame==2)
    		this.animations.play('dragonvuelo');
    	else if(this.animations.frame==7) {
    		if(this.contador == this.veces){
    			this.contador = 1;
    			this.animations.play('dragonterminavuelo');
    		}
    		else
    			this.contador +=1; 
    	}
    	else if(this.animations.frame==10)
    		this.animations.play('dragonlevantavuelo');
    }

	
}
