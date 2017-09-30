var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Boss');

var button;
var map;
var layer;
var bogdan;
var enemies;
var cursors;
var spacebar;
var ctrl;
var text;


game.state.add('boot', boot);
game.state.add('load', load);
game.state.add('play', play);

game.state.start('boot');