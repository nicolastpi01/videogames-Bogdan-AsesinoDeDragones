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
}