var play = {

	preload: function(){},

	create: function(){
		this.createKeys();
		this.createMap();
		this.createBodgan();
		this.createEnemy();

		game.camera.follow(bodgan);
	},

	update: function(){
		this.checkCollitions();
		this.processInput();
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

	createBodgan: function(){
		bodgan = new Knight(game, 50, 500, 'knight');	  
	},

	createEnemy: function(){
		enemy = new Enemy(game, 800, 500, 'enemy');
	},

	//-------------------------------------

	checkCollitions: function(){
		game.physics.arcade.collide(bodgan, layer);
		//game.physics.arcade.collide(bodgan, enemy);
		game.physics.arcade.collide(enemy, layer);
	},

	processInput: function(){
		bodgan.processInput(cursors, spacebar);
	}

};