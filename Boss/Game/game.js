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
var text;

var pinches;
var hearts;

var shake;

var background;


game.state.add('boot', boot);
game.state.add('load', load);
game.state.add('play', play);
//game.state.add('gameover', gameover);


game.state.start('boot');