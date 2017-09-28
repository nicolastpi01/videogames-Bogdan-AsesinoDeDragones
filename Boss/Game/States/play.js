var play = {

	preload: function(){},

	create: function(){
		this.createKeys();
		this.createMap();
		this.createBogdan();
		this.createEnemies();

		game.camera.follow(bogdan);
	},

	update: function(){
		this.checkCollitions();
		this.processInput();
		this.processEnemyMovement();
		this.checkLose();
	},

	render: function(){
		//game.debug.body(bogdan);
		//game.debug.body(enemy);
	},

	//-----------------------------------------

	createKeys: function(){
		cursors = game.input.keyboard.createCursorKeys();
  		spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  		ctrl = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
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

	createEnemies: function(){
		enemies = game.add.group();

		var data = game.cache.getJSON('level_0');

		data.forEach(function(e){
			switch(e.type){
				case 0: enemies.add(new Mummy(game, e.x, e.y, 'mummy')); break;
				case 1: enemies.add(new Zombie(game, e.x, e.y, 'zombie')); break;
				case 2: enemies.add(new Skeleton(game, e.x, e.y, 'skeleton')); break;
				case 3: enemies.add(new Dragon(game, e.x, e.y, 'dragon')); break;
				case 4: enemies.add(new Slime(game, e.x, e.y, 'slime'));
			}
  	});
	},

	//-------------------------------------

	checkCollitions: function(){
		game.physics.arcade.collide(bogdan, layer);
		game.physics.arcade.collide(enemies, layer);
		game.physics.arcade.overlap(bogdan, enemies, this.processOverlap);
	},

	processInput: function(){
		bogdan.processInput(cursors, spacebar, ctrl);
	},

	processEnemyMovement: function(){
		enemies.forEach(function(e){ e.processMovement(); });
	},

	processOverlap: function(bodgan, e){
		if (bogdan.body.velocity.y > 0) {
			bogdan.bounce();
      		e.kill();
    	}else{
    		bogdan.life -= 1;
    		bogdan.bounceBack();
    	}
	},

	checkLose: function(){
		if(bogdan.isDead()){
			game.state.start('boot');
		}
	}

};