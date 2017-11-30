class EnemyWall extends Phaser.Sprite{

	constructor(game, x, y, sprite){
		super(game, x, y, sprite);

		game.physics.arcade.enable(this);

		game.add.existing(this);

		this.scale.setTo(0.01);

		this.body.setSize(3500, 5000);
		this.body.allowGravity = false;
		this.body.immovable = true;
	}

}