var counter = 10;
var gameover = {

	preload: function(){
		game.load.image('looser', 'Resources/gameOver.jpg');
        //gameOverText = new Text(game, 20, 50, 'press start button to continue', style)
	},

	create: function(){
        text = game.add.text(15, 20, 'press start button to continue:' +counter, { font: "24px Arial", fill: "#333333" });
        loop = this.game.time.events.loop(1000, this.updateCounter, this);
		button = game.add.button(400, 300, 'looser', onClick);
		button.anchor.setTo(0.5);
	},

	update: function(){
        text.setText('press start button to continue:' +counter);
        if(counter == 0) {
            game.state.start('boot');
        }
    },
    
    updateCounter: function() {
        counter-=1;        
    },

};


function onClick() {
	game.state.start('load');
}