var load = {

	preload: function(){
		game.load.tilemap('map', 'Game/Maps/test-map.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('map1', 'Game/Maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('Tiles_32x32', 'Resources/Tiles_32x32.png');
		game.load.image('background','Resources/FondoMountains.png');
		game.load.image('background0','Resources/Background0.png');

		game.load.image('pixel', 'Resources/pixel_red.png');
		game.load.image('heart','Resources/hearth-energy.png');
		game.load.image('fire-attack', 'Resources/Fire-Attack.png');
		game.load.image('life', 'Resources/icon-life.png');
		game.load.image('wall', 'Resources/block.png');

		game.load.spritesheet('knight', 'Resources/dragon-knight.png', 256/4, 256/4);

		game.load.spritesheet('mummy', 'Resources/mummy37x45.png', 37, 45);
		game.load.spritesheet('zombie', 'Resources/zombie_n_skeleton2.png', 288/9, 256/4);
		game.load.spritesheet('skeleton', 'Resources/zombie_n_skeleton2.png', 288/9, 256/4);
		game.load.spritesheet('dragon', 'Resources/dragon96x64.png', 96, 64);
		game.load.spritesheet('slime', 'Resources/slime.png', 320/10, 640/20);

        game.load.image('BDragon', 'Resources/granDragon.png', 320/10, 640/20);
		game.load.json('level_0', 'Game/Levels/enemies-level-0.json');
		game.load.json('lifes', 'Game/Levels/lifes.json');
		game.load.json('walls', 'Game/Levels/walls.json');
	},

	create: function(){
		shake = new Phaser.Plugin.Shake(game);
		game.plugins.add(shake);

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 300;
		
		this.createKeys();

		game.state.start('play');
	},

	update: function(){},

	createKeys: function(){
		cursors = game.input.keyboard.createCursorKeys();
  		spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  		ctrl = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
	},

};