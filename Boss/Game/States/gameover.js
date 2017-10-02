var gameover = {

	preload: function(){
		game.load.image('looser', 'Resources/gameOver.jpg');
        //gameOverText = new Text(game, 20, 50, 'press start button to continue', style)
	},

	create: function(){
        text = game.add.text(15, 20, "press start button to continue", { font: "24px Arial", fill: "#333333" });
		button = game.add.button(400, 300, 'looser', onClick);
		button.anchor.setTo(0.5);
	},

	update: function(){}

};


function onClick() {
	game.state.start('boot');
}