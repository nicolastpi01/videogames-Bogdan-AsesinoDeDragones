class Coin extends Phaser.Sprite{
	constructor(game, x, y, sprite){
		super(game, x, y, sprite);

		game.physics.arcade.enable(this);

		game.add.existing(this);

		this.frame = 0;
		this.animations.add('spin', [0, 1, 2, 3, 4, 5], 15, true);

		this.scale.setTo(0.6);
		this.anchor.setTo(0.5);

		this.body.gravity.y = 1000;
		this.body.maxVelocity.y = 1000;

		this.body.allowGravity = true;
		this.body.collideWorldBounds = true;

		this.body.velocity.y = -300;
		this.animations.play('spin');
	}
}