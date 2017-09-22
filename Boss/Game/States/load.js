var load = {

	preload: function(){
		game.load.tilemap('map', 'Game/Maps/test-map.json', null, Phaser.Tilemap.TILED_JSON);

		game.load.image('Tiles_32x32', 'Resources/Tiles_32x32.png');

		game.load.spritesheet('knight', 'Resources/Knight.png', 175/10.9, 141/6);
		game.load.spritesheet('enemy', 'Resources/enemy.png', 480/10, 240/5);
	},

	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 300;

		game.state.start('play');
	},

	update: function(){}

};