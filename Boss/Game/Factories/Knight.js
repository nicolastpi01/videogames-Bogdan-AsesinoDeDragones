class Knight extends Phaser.Sprite {

	constructor(game, x, y, sprite){
		super(game, x, y, sprite);

		game.physics.arcade.enable(this);

		game.add.existing(this);

		this.init();
	}

	init(){
		this.life = 10;
        

		this.canDoubleJump = true;

		this.frame = 0;

		this.scale.setTo(0.7);
		this.anchor.setTo(0.5);

		this.body.gravity.y = 1000;
		this.body.maxVelocity.y = 1000;
		this.body.allowGravity = true;
		this.body.collideWorldBounds = true;

		this.animations.add('walk', [0, 1, 2, 3], 10, true);
		this.animations.add('jump', [4], 10, true);
		this.animations.add('attack', [4, 6, 4], 25, true);

		this.stateMachine = new StateMachine();
	}

	//-------------------------------------------------------

	processInput(cursors, spacebar, ctrl){
		cursors.left.onDown.add(this.changeStateToWalkLeft, this);
		cursors.left.onUp.add(this.changeStateToIdle, this);

		cursors.right.onDown.add(this.changeStateToWalkRigth, this);
		cursors.right.onUp.add(this.changeStateToIdle, this);

		spacebar.onDown.add(this.changeStateToJump, this);

		ctrl.onDown.add(this.changeStateToAttack, this);
		ctrl.onUp.add(this.changeStateToIdle, this);

		//Arreglar cambio de estado a Idle
	}
	
	changeStateToWalkLeft(){
		this.stateMachine.changeState('walk', this, {"x":-250, "scale":-0.7});
	}
	changeStateToWalkRigth(){
		this.stateMachine.changeState('walk', this, {"x":250, "scale":0.7});
	}
	changeStateToJump(){
		this.stateMachine.changeState('jump', this, {"y":-600});
	}
	changeStateToIdle(){
		this.stateMachine.changeState('idle', this, {});	
	}
	changeStateToAttack(){
		this.stateMachine.changeState('attack', this, {});
	}

	//processInput(cursors, spacebar, ctrl){
	//	if (cursors.left.isDown){
	//    	this.body.velocity.x = -250
	//    	this.scale.x = -0.7;
	//    	this.playAnimation('walk');
	//  	}else if (cursors.right.isDown){
	//    	this.body.velocity.x = 250;
	//    	this.scale.x = 0.7;
	//    	this.playAnimation('walk');
	//  	}else {
	//  		this.body.velocity.x = 0;
	//  		this.animations.stop();
	//  	}
	//
	//  	spacebar.onDown.add(this.processJump, this);
	//}

	//processJump(){
	//	this.animations.stop();
	//	this.animations.play('jump');

	//	if(!this.isJumping()){
	//		this.jump(-600);
	//	}else{
	//		this.trySecondJump();
	//	}

	//	this.resetDoubleJump();
	//}

	//trySecondJump(){
	//	if(this.canDoubleJump){
	//		this.canDoubleJump = false;
	//		this.jump(-600);
	//	}
	//}

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
		this.jump(-200);
	}

	bounceBack(){
		if (this.body.touching.right || this.body.blocked.right) {
			this.x -= 25;
    	}
    	else if (this.body.touching.left || this.body.blocked.left) {
    		this.x += 25;
    	}
	}

	isDead(){
		return this.life <= 0;
	}

	getLife(){
		return this.life;
	}
}

//-------------------------------------

class StateMachine {
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
		this.currentState = this.states.find(this.attack);
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
	}
}




