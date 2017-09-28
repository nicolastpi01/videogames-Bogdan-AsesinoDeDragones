var load = {

	preload: function(){
		game.load.tilemap('map', 'Game/Maps/test-map.json', null, Phaser.Tilemap.TILED_JSON);

		game.load.image('Tiles_32x32', 'Resources/Tiles_32x32.png');

		game.load.spritesheet('knight', 'Resources/dragon-knight.png', 256/4, 256/4);

		game.load.spritesheet('mummy', 'Resources/mummy37x45.png', 37, 45);
		game.load.spritesheet('zombie', 'Resources/zombie_n_skeleton2.png', 288/9, 256/4);
		game.load.spritesheet('skeleton', 'Resources/zombie_n_skeleton2.png', 288/9, 256/4);
		game.load.spritesheet('dragon', 'Resources/dragon96x64.png', 96, 64);

		game.load.json('level_0', 'Game/Levels/enemies-level-0.json');
	},

	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 300;

		game.state.start('play');
	},

	update: function(){}

};