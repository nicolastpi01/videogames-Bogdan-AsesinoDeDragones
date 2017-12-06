var dragonvolador;
var dragonidle;

class BDragon extends Enemy{
	constructor(game, x, y, sprite){
		super(game, x, y, sprite);
		this.value = 100;
		this.frame = 0;
		this.life = 10;
		this.body.allowGravity = true;
		this.body.inmovable = false;

		this.scale.set(1.5);
		this.body.velocity.x = 0;

		this.contador = 1;
		this.veces = 3;
		this.animations.updateIfVisible = false;
	}

	processMovement(){
		//Logre hacerlo funcionar, pero no me gusta el cambio abrupto. Comenzare a tocar el volumen la prox
		if( this.inCamera && this.life>=0){
			if(!game.bostezo.isplaying) game.bostezo.resume();
		}
		else
			game.bostezo.pause();
		
		if(this == dragonidle) 
			this.update_idle();
		else 
			this.volar();
    }

    volar(){}

    update_vuelo(a,b){
    	if(this.animations.frame==2)
    		this.animations.play('dragonvuelo');
    	else if(this.animations.frame==7) {
    		if(this.contador == this.veces){
    			this.contador = 1;
    			this.animations.play('dragonterminavuelo');
    			dragonvolador.visible = false;
    			dragonidle.visible = true;
    		}
    		else
    			this.contador +=1; 
    	}
    	else if(this.animations.frame==10)
    		this.cambio();
    }

	update_idle(a,b){
		if( this.animations.frame >= 11) this.cambio();
		else if( this.animations.frame>=3 && this.animations.frame <=6)
    		this.weapon.fire();
    	else if(this.animations.frame  < 3)
    		if (this.x > bogdan.x)
    			this.weapon.fireAngle = Phaser.ANGLE_LEFT ;
    		else
    			this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
    }

    cambio(){
    	var ahora = dragonvolador.visible ;    	
    	
    	if(ahora){
    		dragonidle.animations.play('idledragon');
    		dragonvolador.animations.stop();

    		dragonidle.x = dragonvolador.x;
    		dragonidle.x = dragonvolador.y;
    	}
    	else{
    		dragonvolador.animations.play('dragonlevantavuelo');
			dragonidle.animations.stop();

    		dragonvolador.x = dragonidle.x;
    		dragonvolador.x = dragonidle.y;
    	}

    	dragonvolador.visible = !ahora; 
    	dragonidle.visible = ahora;
    }
}

class BDragonVolador extends BDragon{
	init(){
		//Casi le atine. Hace falta moverlo con una aplicacion mejor que paint
		this.animations.add('dragonlevantavuelo', [0, 1, 2], 9, true);
		this.animations.add('dragonvuelo', [3, 4, 5, 6, 7], 18, true);
		this.animations.add('dragonterminavuelo', [8,9,10], 15, true);
		this.events.onAnimationLoop.add(this.update_vuelo,this); //Era otra la funcion, ya funciona!
		//this.animations.play('dragonlevantavuelo');
		this.body.width = 100;
    }

    volar(){
    	if(this.animations.frame <= 7 && this.animations.frame > 3){
    		this.body.velocity.x += 18 * this.scale.x;
    		this.body.velocity.y += 10;
    	} else if(this.animations.frame >7) this.body.velocity.x *= 0.6; // Frenar

    	if ( this.body.touching.right || this.body.blocked.right) {
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

class BDragonIdle extends BDragon{
	init(){
		this.animations.add('idledragon', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
		this.animations.play('idledragon');
		this.body.width = 80;
		//this.body.setSize(0,0, 80,100);
			var weapon = game.add.weapon(10, 'fire-attack');
		    //  The bullet will be automatically killed when it leaves the world bounds
		    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		    //  Because our bullet is drawn facing up, we need to offset its rotation:
		    weapon.bulletAngleOffset = 0;
		    weapon.angle = 90;
		    weapon.bulletSpeed = 600;

		    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
		    weapon.fireRate = 50;
		    //  Add a variance to the bullet angle by +- this value
		    weapon.bulletAngleVariance = 10;
		    //  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
		    weapon.trackSprite(this, 14, -50);
		    this.weapon = weapon;
	}
}