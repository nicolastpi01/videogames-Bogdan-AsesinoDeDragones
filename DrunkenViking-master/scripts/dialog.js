var Dialog = function(game, group, x, y, texts) {
  Phaser.Sprite.call(this,
                     game,
                     x, y,
                     'dialog');
  this.width *= 2;
  this.height *= 2;
  this.x -= this.width / 2;
  this.y -= this.height / 2;
  this.animations.add('bob', [0, 1], 4, true);
  this.animations.play('bob');
  
  var textStyle = {
    font: "24px VT323", fill: "#ffffff", align: "left",
    wordWrap: true, wordWrapWidth: this.width - 48 - 96
  };
  this.textSprite = game.add.text(this.x + 48, this.y + 8, '', textStyle);
  this.setTexts(texts);
  this.sound = game.add.sound('beep');
  
  group.add(this);
  group.add(this.textSprite);
};
Dialog.prototype = Object.create(Phaser.Sprite.prototype);
Dialog.prototype.constructor = Dialog;

Dialog.prototype.next = function() {
  this.textCounter++;
  this.sound.play();
  if (this.textCounter >= this.texts.length) {
    this.textSprite.text = '';
    return false;
  }
  this.textSprite.text = this.texts[this.textCounter];
  return true;
};

Dialog.prototype.setTexts = function(texts) {
  this.textCounter = 0;
  this.texts = texts;
  this.textSprite.text = this.texts[this.textCounter];
};