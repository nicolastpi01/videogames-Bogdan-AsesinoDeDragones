var play = {

	preload: function(){},

	create: function(){
		this.createKeys();
		this.createMap();
		this.createBogdan();
		this.createEnemy();

		game.camera.follow(bogdan);
	},

	update: function(){
		this.checkCollitions();
		this.processInput();
		this.processEnemyMovement();
		this.checkLose();
	},

	//-----------------------------------------

	createKeys: function(){
		cursors = game.input.keyboard.createCursorKeys();
  	spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	createMap: function(){
		map = game.add.tilemap('map');

		map.addTilesetImage('Tiles_32x32');
		map.setCollisionBetween(1, 12);

		layer = map.createLayer(0);
  	layer.resizeWorld();
  	layer.debugSettings.forceFullRedraw = true;
	},

	createBogdan: function(){
		bogdan = new Knight(game, 50, 500, 'knight');	  
	},

	createEnemy: function(){
		enemy = new Enemy(game, 800, 500, 'enemy');
	},

	//-------------------------------------

	checkCollitions: function(){
		game.physics.arcade.collide(bogdan, layer);
		game.physics.arcade.collide(enemy, layer);
		game.physics.arcade.overlap(bogdan, enemy, this.processOverlap);
	},

	processInput: function(){
		bogdan.processInput(cursors, spacebar);
	},

	processEnemyMovement: function(){
		enemy.processMovement();
	},

	processOverlap: function(){
		if (bogdan.body.velocity.y > 0) {
			bogdan.bounce();
      enemy.kill();
    }else{
    	bogdan.life -= 1;
    	bogdan.x -= 25;
    }
	},

	checkLose: function(){
		if(bogdan.life <= 0){
			game.state.start('boot');
		}
	}

};