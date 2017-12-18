
class Boss2{

    constructor(game, x, y, spritename){
        var dragonatlas =  game.add.sprite(x, y,spritename );
            dragonatlas.animations.add('idle', Phaser.Animation.generateFrameNames('idle', 0, 14), 15, true);
            dragonatlas.animations.add('despegue', Phaser.Animation.generateFrameNames('despegue', 0,2), 16, true);
            dragonatlas.animations.add('volar', Phaser.Animation.generateFrameNames('volar', 3,10), 4, true);
            dragonatlas.animations.add('muerte', Phaser.Animation.generateFrameNames('muerte', 0,7), 4, true);
            dragonatlas.animations.add('llamaarriba', Phaser.Animation.generateFrameNames('llamaarriba', 0,5), 4, true);
            dragonatlas.events.onAnimationLoop.add(this.cambio, this);
            /*
            dragonatlas.animations.forEach(function(element){
                var attribute = element.getAttribute('onLoop');
                element.onclick = function(){
                };
            });*/
            //altura bajito 470 llamaarriba
        //dragonatlas.events.onAnimationLoop.add(update_vuelo,dragonatlas);
        game.physics.arcade.enable(dragonatlas);
        dragonatlas.body.inmovable = false;
        dragonatlas.body.collideWorldBounds = true;
        dragonatlas.body.allowGravity = true;
        dragonatlas.hit = this.hit

        dragonatlas.anchor.setTo(0.5);
        dragonatlas.scale.set(2);
        dragonatlas.animations.updateIfVisible = false;
        dragonatlas.value = 100
        this.dragon = dragonatlas;

        this.dragon.animations.play('idle');
        game.bostezo.play();
        game.add.existing(dragonatlas);
    
        this.life = 10;
        
        this.emitter = this.createEmitter(dragonatlas.x, dragonatlas.y);
        this.contador = 0;
        this.createWeapon();
    }

    update(){
        game.physics.arcade.collide(this.dragon, layer);       
        game.physics.arcade.collide(this.emitter, layer);
        //game.bostezo.volume=1-Phaser.Math.smoothstep(this.distanciaABogdan(),0,2000);

        if(this.life == 0){
            //this.dragon.kill();
            this.emitter.start(false, 2000, 5, 100);
            //this.destroy(true);
        }else{
            if(this.dragon.animations.currentAnim.name == 'idle')
                this.update_idle();
            else(this.dragon.animations.currentAnim.name == 'volar')
                this.update_vuelo();
            this.weapon.fireAtSprite(bogdan);
        }
    }

    distanciaABogdan(){
        return  game.physics.arcade.distanceBetween(bogdan,this.dragon);
    }

    cambio(a,b){
        var animacion = this.dragon.animations.currentAnim;
        if(animacion.loopCount == 0) return;

        if( animacion.name == 'idle' && animacion.loopCount >= 3){
            this.dragon.animations.play('despegue');
            this.contador = 0;
        } else if( animacion.name == 'despegue'){
            this.dragon.animations.play('volar');
            this.contador = 0;
        }else if( animacion.name == 'volar' && animacion.loopCount >= 4){
            this.dragon.animations.play('idle');
            this.contador = 0;
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
        this.weapon.bulletAngleVariance = 0;
        this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
    }

    collide(d, b){}

    hit(){
        boss.emitter.x = boss.dragon.x;
        boss.emitter.y = boss.dragon.y;

        boss.life -= 1;
        boss.emitter.start(true, 2000, null, 10);
    }

    processHit(b, bullet){
        bullet.kill();
        b.getHit();
    }

    update_vuelo(){
//        boss.dragon.animations.currentAnim.loopCount
        if (this.dragon.body.touching.right || this.dragon.body.blocked.right) {
            this.dragon.body.velocity.x = -this.dragon.body.velocity.x;
            this.dragon.scale.set(-2,2);
        }
        else if (this.dragon.body.touching.left || this.dragon.body.blocked.left) {
            this.dragon.body.velocity.x = -this.dragon.body.velocity.x;
            this.dragon.scale.set(2,2);
        }
        var sprite = this.dragon;
        //sprite.body.velocity.x = 0;
        //sprite.body.velocity.y = 0;
        //sprite.body.angularVelocity = 0;

        //game.physics.arcade.velocityFromAngle(sprite.angle, 300, sprite.body.velocity);
        //game.physics.arcade.accelerationFromRotation(3.14/2, 200, sprite.body.acceleration);
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            game.physics.arcade.velocityFromRotation(3.14/2, -400, sprite.body.velocity);
    }

    render(){
        game.debug.text("Distance to pointer: " + game.physics.arcade.distanceBetween(bogdan,boss.dragon) ,32,100);
    }

    update_idle(){
       if (this.dragon.x > bogdan.x){
                this.weapon.fireAngle = Phaser.ANGLE_LEFT;
                this.dragon.scale.set(-2,2);
            }
            else{
                this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
                this.dragon.scale.set(2,2);
            }

        if( this.dragon.animations.frame>=3 && this.dragon.animations.frame <=6)
            this.weapon.fireAtSprite(bogdan);
    }

}

function muertegrandragon(){ 
        game.bostezo.stop();
        game.dragonrespirando.stop();
    //    var text1 = game.add.text(boss.dragon.x, 750/2, 'Bien hecho bogdan, pero el dragon', { font: "32px Courier", fill: "#000000" });
    //    var text2 = game.add.text(boss.dragon.x, 750/2+20, 'esta en otro juego', { font: "32px Courier", fill: "#000000" });
        //text1.fixedToCamera = text2.fixedToCamera= false;
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