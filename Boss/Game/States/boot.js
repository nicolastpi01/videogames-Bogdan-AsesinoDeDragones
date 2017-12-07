var boot = {

	preload: function(){
		game.load.image('title', 'Resources/Bogdan.png');
		game.load.script('filter', 'Phaser/Fire.js');
	},

	create: function(){
		button = game.add.button(game.world.centerX, game.world.centerY, 'title', onClick);
		button.anchor.setTo(0.5);

		back = game.add.sprite(0, 0);
		back.width = 1250;
		back.height = 750;

		filter = game.add.filter('Fire', 1250, 750);
		filter.alpha = 0.0;

		back.filters = [filter];
	},

	update: function(){
		filter.update();
	}

};

function onClick() {
	game.state.start('load');
}


