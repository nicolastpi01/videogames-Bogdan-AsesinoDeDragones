class Knight extends Phaser.Sprite {

	constructor(game, x, y, sprite){
		super(game, x, y, sprite);

		game.physics.arcade.enable(this);

		game.add.existing(this);

		this.game = game;

		this.init();
	}

	init(){
		this.life = 3;   

		this.canDoubleJump = true;

		this.points = 0;

		this.frame = 0;

		this.invincible = false;

		this.emitter = this.createEmitter(this.x, this.y);

		this.scale.setTo(0.7);
		this.anchor.setTo(0.5);

		this.body.setSize(30, 64, 5);
		this.body.gravity.y = 1000;
		this.body.maxVelocity.y = 1000;
		this.body.allowGravity = true;
		this.body.collideWorldBounds = true;

		this.animations.add('walk', [0, 1, 2, 3], 10, true);
		this.animations.add('jump', [4], 10, true);
		this.animations.add('attack', [4, 6, 4], 25, false);

		this.stateHandler = new StateHandler();

		this.createWeapon();

	}

	update(){
		this.processInput(cursors, jumpButton, attackButton);


		game.physics.arcade.collide(this, layer);

		if(!this.invincible){ game.physics.arcade.collide(this, enemies, this.processCollition); }

        game.physics.arcade.overlap(this.weapon.bullets, enemies, this.processHit);     

        game.physics.arcade.collide(this.emitter, layer);

        this.checkLose();
	}

	createWeapon(){
		this.weapon = game.add.weapon(2, 'fire-attack');

		this.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
		this.weapon.bulletKillDistance = 150;
		//this.weapon.bulletAngleOffset = 0;
		this.weapon.bulletSpeed = 800;
		this.weapon.fireRate = 100;
		this.weapon.trackSprite(this, 0, 0);
		this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
	}

	//-------------------------------------------------------

	addpts(pts){
    	this.points += pts;
    	text.setText(this.points);
    	//console.log(this.points);
    }

	processCollition(b, enemy){
		game.pisarknight.play();
        b.processJumpKill(enemy);
        text.setText(b.points);
	}

	bossCollition(b, enemy){
		game.pisarknight.play();
        b.processJumpKill(enemy);
        text.setText(b.points);
	}

	coinCollition(b, coin){
		coin.kill();
        b.addpts(100);
	}

	addLife(){
        if(this.life < 3){
            this.life += 1;
            var h = game.add.sprite(hearts.getAt(this.life-2).x + 35, 10, 'heart');
            h.scale.setTo(0.07);
            hearts.add(h);
        }
	}

	processInput(cursors, spacebar, ctrl){
		cursors.left.onDown.add(this.changeStateToWalkLeft, this);
		cursors.right.onDown.add(this.changeStateToWalkRigth, this);

		jumpButton.onDown.add(this.changeStateToJump, this);

		attackButton.onDown.add(this.changeStateToAttack, this);

		if(this.cursorsOrCtrlIsUp(cursors, attackButton) && !this.cursorsOrCtrlIsDown(cursors, attackButton)){
			this.changeStateToIdle();
		}
	}

	cursorsOrCtrlIsUp(cursors, ctrl){
		return cursors.left.isUp || cursors.right.isUp || ctrl.isUp;
	}
	cursorsOrCtrlIsDown(cursors, ctrl){
		return cursors.left.isDown || cursors.right.isDown || ctrl.isDown;
	}
	
	changeStateToWalkLeft(){
		this.stateHandler.changeState('walk', this, {"x":-250, "scale":-0.7});
		this.weapon.fireAngle = Phaser.ANGLE_LEFT;
	}
	changeStateToWalkRigth(){
		this.stateHandler.changeState('walk', this, {"x":250, "scale":0.7});
		this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
	}
	changeStateToJump(){
		this.stateHandler.changeState('jump', this, {"y":-600});
	}
	changeStateToIdle(){
		this.stateHandler.changeState('idle', this, {});	
	}
	changeStateToAttack(){
		this.stateHandler.changeState('attack', this, {});
	}

	jump(velocity){
		this.body.velocity.y = velocity;
	}

	isJumping(){
		return !(this.body.onFloor() || this.body.touching.down);
	}

	resetDoubleJump(){
		if(!this.isJumping()){
			this.canDoubleJump = true;
		}
	}

	playAnimation(animation){
		if(!this.isJumping()){
			this.animations.play(animation);
		}
	}

	bounce(){
		this.jump(-300);
	}

	bounceBack(){
		var newx = this.x;
		var newy = this.y -25;
		
		if (this.body.touching.right || this.body.blocked.right) {
			newx -= 25;
    	}
    	else if (this.body.touching.left || this.body.blocked.left) {
    		newx += 25;
    	}

    	game.add.tween(this).to( { x: newx, y: newy }, 50, Phaser.Easing.Linear.None, true);
	}

	isDead(){
		return this.life <= 0;
	}

	getLife(){
		return this.life;
	}

	isAttacking(){
		return this.StateHandler.currentState.name == 'attack';
	}

	processHit(b, e){
		b.kill();
		game.golpeknight.play();
		bogdan.addpts(e.value);
		e.hit();
	}

	processBossHit(b, bullet){
		bullet.kill();
		game.golpeknight.play();
		this.addpts(b.value);
		b.hit();
	}

	processJumpKill(e){      
        if(this.body.touching.down && e.body.touching.up){
            this.bounce();
            this.addpts(e.value);
            e.hit();
        } else {
        	this.getHit();
        }
	}

	getHit(){
		this.emitter.x = this.x;
		this.emitter.y = this.y;

		if(!this.invincible){
			this.life -= 1;
        	this.addpts(-10);
        	game.camera.flash(0xff0000, 50, true);
        	shake.shake(5);
        	this.bounceBack();
        	this.emitter.start(true, 2000, null, 10);
        	hearts.removeChildAt(hearts.length-1);
        	this.toggleInvincible();
        	game.time.events.add(2000, this.toggleInvincible, this);
		}
	}

	toggleInvincible(){
		this.invincible = !this.invincible;
	}

	createEmitter(x, y){
        var emitter = game.add.emitter(0, 0, 100);
        emitter.makeParticles('pixel_blue');
        emitter.gravity = 200;
        emitter.x = x;
        emitter.y = y;

        return emitter;
    }

    checkLose(){
    	if (this.isDead()) {
            game.state.start('play');
        }
    }

    
}


//-------------------------------------





class StateHandler {
	constructor(){
		this.currentState;
		this.states = [];

		this.createStates();
	}

	createStates(){
		this.states.push(new Idle('idle'));
		this.states.push(new Walk('walk'));
		this.states.push(new Jump('jump'));
		this.states.push(new Attack('attack'));

		this.currentState = this.states.find(this.idle);
	}

	idle(s){return s.name == 'idle';}
	walk(s){return s.name == 'walk';}
	jump(s){return s.name == 'jump';}
	attack(s){return s.name == 'attack';}

	changeState(event, knight, data){
		switch(event){
			case 'idle'  : this.handleIdle(knight); break;
			case 'walk'  : this.handleWalk(knight, data); break;
			case 'jump'  : this.handleJump(knight, data); break;
			case 'attack': this.handleAttack(knight);
		}
	}

	handleIdle(knight){
		this.currentState = this.states.find(this.idle);
		this.currentState.handle(knight);
	}

	handleWalk(knight, data){
		this.currentState = this.states.find(this.walk);
		this.currentState.handle(knight, data);
	}

	handleJump(knight, data){
		if(this.currentState.name != 'jump'){
			this.currentState = this.states.find(this.jump);
		}

		if(!knight.isJumping()){
			this.currentState.handle(knight, data);
		}else{
			this.handleSecondJump(knight, data);
		}

		knight.resetDoubleJump();
	}

	handleSecondJump(knight, data){
		if(knight.canDoubleJump){
			knight.canDoubleJump = false;
			this.currentState.handle(knight, data);
		}
	}

	handleAttack(knight){
		if(this.currentState.name != 'atack'){
			this.currentState = this.states.find(this.attack);
		}
		this.currentState.handle(knight);
	}
}

class State {
	constructor(name){ this.name = name; }
	handle(){}
}

class Idle extends State {
	constructor(name){ super(name); }

	handle(knight){
		knight.body.velocity.x = 0;
		//knight.body.velocity.y = 0;
	  	knight.animations.stop();
	  	knight.frame = 0;
	}
}

class Walk extends State {
	constructor(name){ super(name); }

	handle(knight, data){
		knight.body.velocity.x = data.x;
		knight.scale.x = data.scale;
		knight.animations.play('walk');
	}
}

class Jump extends State {
	constructor(name){ super(name); }

	handle(knight, data){
		knight.animations.play('jump');
		knight.body.velocity.y = data.y;
	}
}

class Attack extends State {
	constructor(name){ super(name); }

	handle(knight, data){
		knight.animations.play('attack');
		knight.weapon.fire();
		game.lanzafuego.play();
	}
}




