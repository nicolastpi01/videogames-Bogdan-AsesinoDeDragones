var game = new Phaser.Game(1250, 750, Phaser.CANVAS, 'Boss');

var button;
var map;
var layer;
var bogdan;
var enemies;
var walls;
var lifes;
var cursors;
var jumpButton;
var attackButton;
var hearts;
var coins;
var shake;
var background;

var text;
var pinches;


game.state.add('boot', boot);
game.state.add('load', load);
game.state.add('play', play);

game.state.start('boot');