
class Boss2{

    constructor(game, x, y, spritename){
        var dragonatlas =  game.add.sprite(x, y,spritename );
            dragonatlas.animations.add('idle', Phaser.Animation.generateFrameNames('idle', 0, 14), 15, true);
            dragonatlas.animations.add('volar', Phaser.Animation.generateFrameNames('volar', 0,10), 8, true);
            dragonatlas.animations.add('muerte', Phaser.Animation.generateFrameNames('muerte', 0,7), 4, true);
        dragonatlas.events.onAnimationLoop.add(update_vuelo,dragonatlas);

        dragonatlas.scale.set(1.5);
        dragonatlas.animations.updateIfVisible = false;
        this.dragon = dragonatlas;

        game.add.existing(dragonatlas);
    
        this.life = 10;
        this.value = 100;
        this.emitter = this.createEmitter(dragonatlas.x, dragonatlas.y);

        game.physics.arcade.enable(dragonatlas);
        dragonatlas.body.inmovable = false;
        dragonatlas.body.collideWorldBounds = true;
        dragonatlas.body.allowGravity = true;


        this.createWeapon();
    }

    update(){
        game.physics.arcade.collide(this.dragon, layer);       
        game.physics.arcade.collide(this.emitter, layer);
        game.physics.arcade.overlap(this.weapon.bullets, bogdan, this.processHit);

        if(this.life == 0){
            this.dragon.kill();
            this.emitter.start(false, 2000, 5, 100);
            muertegrandragon();
            this.destroy(true);
        }else{
            this.weapon.fireAtSprite(bogdan);
        }
    }

    createEmitter(x, y){
        var emitter = game.add.emitter(0, 0, 100);
        emitter.makeParticles('pixel_red');
        emitter.gravity = 200;
        emitter.x = this.dragon.x;
        emitter.y = this.dragon.y;

        return emitter;
    }

    createWeapon(){
        this.weapon = game.add.weapon(1, 'fire-attack');

        this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.weapon.bulletKillDistance = 1500;
        this.weapon.bulletSpeed = 800;
        this.weapon.fireRate = 100;
        this.weapon.trackSprite(this.dragon, -40, -50);
        this.weapon.bulletAngleVariance = 10;
        this.weapon.fireAngle = Phaser.ANGLE_RIGHT;


        //this.body.setSize(0,0, 80,100);
            var weapon = game.add.weapon(10, 'fire-attack');
            //  The bullet will be automatically killed when it leaves the world bounds
            weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
            //  Because our bullet is drawn facing up, we need to offset its rotation:
            weapon.bulletAngleOffset = 0;
            weapon.angle = 90;
            weapon.bulletSpeed = 600;

            //  Add a variance to the bullet angle by +- this value
            
            //  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
            weapon.trackSprite(this, 14, -50);
            //this.weapon = weapon;
    }

    collide(d, b){}

    hit(){
        this.emitter.x = this.dragon.x;
        this.emitter.y = this.dragon.y;

        this.life -= 1;
        this.emitter.start(true, 2000, null, 10);
    }

    processHit(b, bullet){
        bullet.kill();
        b.getHit();
    }

}

function muertegrandragon(){ 
        game.bostezo.stop();
        game.dragonrespirando.stop();
        var text1 = game.add.text(dragonvolador.x, 750/2, 'Bien hecho bogdan, pero el dragon', { font: "32px Courier", fill: "#000000" });
        var text2 = game.add.text(dragonvolador.x, 750/2+20, 'esta en otro juego', { font: "32px Courier", fill: "#000000" });
        text1.fixedToCamera = text2.fixedToCamera= false;
}


	function processMovement(){
		if( this.inCamera){
			
		if(!game.bostezo.isplaying) game.bostezo.resume();

		if (this.x > bogdan.x)
    		this.scale.set(-1.5,1.5);
    	else
    		this.scale.set(1.5); 

		if(this == dragonidle) 
			this.update_idle();
		else 
			this.volar();
		}
		else
			game.bostezo.pause();
    }

function  update_vuelo(a,b){
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

function update_idle(a,b){
		if( this.animations.frame >= 11) this.cambio();
		else if( this.animations.frame>=3 && this.animations.frame <=6)
    		this.weapon.fire();
    	else if(this.animations.frame  < 3)
    		if (this.x > bogdan.x)
    			this.weapon.fireAngle = Phaser.ANGLE_LEFT ;
    		else
    			this.weapon.fireAngle = Phaser.ANGLE_RIGHT;

    	game.physics.arcade.collide(bogdan, this.weapon.bullets, function(){bogdan.life -= 1;});
    }


function volar(){
    	if(this.animations.frame <= 7 && this.animations.frame > 3){
    		this.x += 18 * this.scale.x;
    		this.y -= 30;
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