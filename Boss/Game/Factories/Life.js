class Life extends Phaser.Sprite{
	constructor(game, x, y, sprite){
		super(game, x, y, sprite);

		game.physics.arcade.enable(this);

		game.add.existing(this);


		this.anchor.setTo(0.5);
		this.scale.set(0.04);

		this.body.inmovable = true;
		this.body.collideWorldBounds = true;
	}

	update(){
		game.physics.arcade.collide(this, layer);
		game.physics.arcade.overlap(this, bogdan, this.procesOverlap);
	}

	procesOverlap(l, bogdan){
		bogdan.addLife();
		l.kill();
	}
}