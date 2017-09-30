var boot = {

	preload: function(){
		game.load.image('title', 'Resources/Bogdan.png');
	},

	create: function(){
		//game.stage.backgroundColor = '#000000';
		button = game.add.button(400, 300, 'title', onClick);
		button.anchor.setTo(0.5);
	},

	update: function(){}

};

function onClick() {
	game.state.start('load');
}


