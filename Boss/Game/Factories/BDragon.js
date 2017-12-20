
class Boss2{

    constructor(game, x, y, spritename){
        var dragonatlas =  game.add.sprite(x, y,spritename );
            dragonatlas.animations.add('idle', Phaser.Animation.generateFrameNames('idle', 0, 14), 15, true);
            dragonatlas.animations.add('despegue', Phaser.Animation.generateFrameNames('volar', 0,1), 4, true);
            dragonatlas.animations.add('volar', Phaser.Animation.generateFrameNames('volar', 2,5), 10, true);
            dragonatlas.animations.add('aterrizaje', Phaser.Animation.generateFrameNames('volar', 6,10), 4, true);
            dragonatlas.animations.add('muerte', Phaser.Animation.generateFrameNames('muerte', 0,7), 4, true);
            dragonatlas.animations.add('llamaarriba', Phaser.Animation.generateFrameNames('llamaarriba', 0,5), 4, true);
            //dragonatlas.events.onAnimationLoop.add(this.cambio, this);
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
        this.contador = 0.0;
        this.gravedad = dragonatlas.body.gravity.y;
        this.createWeapon();
        this.prox = this.update_idle;
    }

    update(){
        game.physics.arcade.collide(this.dragon, layer);       
        game.physics.arcade.collide(this.emitter, layer);
        game.bostezo.volume=1-Phaser.Math.smoothstep(this.distanciaABogdan(),0,2000);

        if(this.life == 0){
            this.life--;
            this.emitter.start(false, 2000, 5, 100);
            this.dragon.animations.play('muerte');           
            this.prox = this.update_muerte;
            game.bostezo.stop();
            game.dragonrespirando.stop();
            game.dragondolor.play();
        }else this.prox();
    }

    distanciaABogdan(){
        return  game.physics.arcade.distanceBetween(bogdan,this.dragon);
    }

    cambio(nombre, opcion){
        this.dragon.animations.play(nombre);

        if(opcion == 0){
            this.prox = this.update_despegue;
            this.dragon.body.velocity.x = 0;            
        } else if(opcion == 1){
            this.prox = this.update_vuelo;
        }else if(opcion == 2){
            this.prox = this.update_aterrizaje;
            var sprite = this.dragon;
            this.contador = 0.0;
            sprite.body.velocity.x = 0;
            sprite.body.velocity.y = 0;
            sprite.body.acceleration.y = this.gravedad;
        }else if( opcion == 3){
            this.prox = this.update_idle;
            if(this.dragon.body.touching.down || this.dragon.body.blocked.down)
                bogdan.bounceBack();
        }else if( opcion == 4){
            this.dragon.kill();
            this.prox = this.update_nada;
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
        this.weapon = game.add.weapon(3, 'fire-attack');

        this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
        this.weapon.bulletKillDistance = 1000;
        this.weapon.bulletSpeed = 800;
        this.weapon.fireRate = 100;
        this.weapon.trackSprite(this.dragon, -40, -50);
        this.weapon.bulletAngleVariance = 10;
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

    loops(){ return this.dragon.animations.currentAnim.loopCount; }

    update_vuelo(){
        if( this.loops() >=4 ) this.cambio('aterrizaje',2);
        this.contador += 0.01;
        var sprite = this.dragon;
        var ang = Phaser.Math.angleBetweenPointsY(boss.dragon.body,bogdan.body);//(this.weapon.fireAngle == Phaser.ANGLE_LEFT )? this.contador : -this.contador ;
        //        boss.dragon.animations.currentAnim.loopCount
        if (this.dragon.body.touching.right || this.dragon.body.blocked.right) {
            this.dragon.body.velocity.x = -this.dragon.body.velocity.x;
            this.dragon.scale.set(-2,2);
        }
        else if (this.dragon.body.touching.left || this.dragon.body.blocked.left) {
            this.dragon.body.velocity.x = -this.dragon.body.velocity.x;
            this.dragon.scale.set(2,2);
        }
//*3.14/7
        game.physics.arcade.velocityFromRotation(ang, 100, sprite.body.velocity);
    }

    update_idle(){
       if( this.loops() >=3 ) this.cambio('despegue',0);
       if(this.dragon.x > bogdan.x){
                this.weapon.fireAngle = Phaser.ANGLE_LEFT;
                this.dragon.scale.set(-2,2);
            }
            else{
                this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
                this.dragon.scale.set(2,2);
            }
        if( this.dragon.animations.frame>=3 && this.dragon.animations.frame <=4){
            game.lanzafuego.play();
            this.weapon.fireAtSprite(bogdan);
        }
    }
    update_despegue(){ if(this.loops() == 1) this.cambio('volar',1);}
    update_aterrizaje(){ if(this.loops() == 1) this.cambio('idle',3);}
    update_muerte(){ if(this.loops() == 1) this.cambio('muerte',4);}
    update_nada(){}
    update_llamaarriba(){
        if(this.dragon.x > bogdan.x){
                this.weapon.fireAngle = Phaser.ANGLE_LEFT;
                this.dragon.scale.set(-2,2);
            }
            else{
                this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
                this.dragon.scale.set(2,2);
            }
        if( false){
            game.lanzafuego.play();
            this.weapon.fireAtSprite(bogdan);
        }
    }

}