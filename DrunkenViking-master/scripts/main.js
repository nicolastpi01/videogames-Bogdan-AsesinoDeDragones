var GameState = function(game){};

GameState.prototype.preload = function() {
};

GameState.prototype.create = function() {
  this.game.stage.backgroundColor = 0x664a33;

  this.sounds = {
    step: this.game.add.audio("step"),
    bump: this.game.add.audio("bump"),
    breakSound: this.game.add.audio("break"),
    pickup: this.game.add.audio("pickup"),
    cat: this.game.add.audio("cat"),
    glass: this.game.add.audio("glass"),
    vomit: this.game.add.audio("vomit"),
    smash: this.game.add.audio("smash"),
    fanfare: this.game.add.audio("fanfare"),
    tada: this.game.add.audio("tada")
  };

  this.groups = {
    bg: this.game.add.group(),
    sprites: this.game.add.group(),
    dialogs: this.game.add.group(),
    title: this.game.add.group()
  };

  this.levelIndex = 0;
  this.map = new Map(this.game, this.groups.bg, levels[this.levelIndex].level);

  this.player = new Player(this.game,
                           this.map.getBed(),
                           ['hrrng', 'hic', 'groan']);
  this.groups.sprites.add(this.player);
  this.dialog = new Dialog(this.game, this.groups.dialogs,
                           SCREEN_WIDTH / 2, SCREEN_HEIGHT - 64,
                           levels[this.levelIndex].texts);
  this.instantReplay = this.game.add.text(48, 24, 'Instant Replay', {
    font: "32px VT323", fill: "#ff6666", align: "left"
  });
  this.instantReplayTween = this.game.add.tween(this.instantReplay)
    .to({alpha: 0.5}, 300, Phaser.Easing.Sinusoidal.InOut)
    .to({alpha: 1}, 300, Phaser.Easing.Sinusoidal.InOut)
    .loop();
  this.instantReplayTween.start();
  this.instantReplayTween.pause();
  this.instantReplay.alpha = 0;
  this.replaying = false;
  // Hide dialog initially
  this.groups.dialogs.alpha = 0;

  this.hintText = this.game.add.text(SCREEN_WIDTH - 190, 24, 'Press R to reset', {
    font: "24px VT323", fill: "#66ff66", align: "right"
  });
  this.hintTextTween = this.game.add.tween(this.hintText)
    .to({alpha: 0.5}, 300, Phaser.Easing.Sinusoidal.InOut)
    .to({alpha: 1}, 300, Phaser.Easing.Sinusoidal.InOut)
    .loop();
  this.hintTextTween.start();
  this.hintTextTween.pause();
  this.hintText.alpha = 0;
  this.hintDisplayCounter = 0;
  this.shoveCounter = 0;

  this.title = new Title(this.game, this.groups.title, this);

  this.lastDirection = null;
  this.moveRepeatCounter = 0;
  var registerKey = function(thegame, keycode, dir) {
    var key = thegame.game.input.keyboard.addKey(keycode);
    key.onDown.add(function(k) {
      thegame.lastDirection = dir;
      thegame.moveRepeatCounter = 0;
    }, thegame);
    key.onUp.add(function(k) {
      if (thegame.lastDirection == dir) {
        thegame.lastDirection = null;
      }
    }, thegame);
  };
  registerKey(this, Phaser.Keyboard.UP, 'up');
  registerKey(this, Phaser.Keyboard.DOWN, 'down');
  registerKey(this, Phaser.Keyboard.LEFT, 'left');
  registerKey(this, Phaser.Keyboard.RIGHT, 'right');
  this.game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add(function(k) {
    if (this.groups.title.alpha == 0 &&
        this.dialog.alpha == 0) {
      this.reset();
    }
  }, this);
  this.moves = [];
  this.movesIndex = -1;
  this.allowSpecialMovement = false;
  this.win = false;
};

GameState.prototype.loadLevel = function(i) {
  console.log('level', i);
  this.title.hide();
  // Show dialog
  this.groups.dialogs.alpha = 1;
  this.levelIndex = i;
  if (this.levelIndex < levels.length) {
    this.map.stop();
    this.map = new Map(this.game, this.groups.bg, levels[this.levelIndex].level);
    this.dialog.setTexts(levels[this.levelIndex].texts);
    this.dialog.alpha = 1;
  } else {
    if (this.levelIndex >= levels.length) {
      // Show end game screen
      console.log('Winner');
      this.win = true;
      this.makeWinScreen();
      return;
    }
  }
  this.moves = [];
  this.movesIndex = -1;
  this.player.move(this.map.getBed());
  this.player.strip();
}

GameState.prototype.stopReplay = function() {
  this.instantReplayTween.pause();
  this.instantReplay.alpha = 0;
  if (!this.replaying) {
    // Nothing to replay
    return;
  }
  this.replaying = false;
  // Show next level
  this.loadLevel(this.levelIndex + 1);
};

GameState.prototype.update = function() {
  // Automove
  if (this.lastDirection != null) {
    this.moveRepeatCounter--;
    if (this.moveRepeatCounter <= 0) {
      this.moveRepeatCounter = 17;
      this.move(this.lastDirection);
    }
  } else {
    this.moveRepeatCounter = 17;
  }
  // If we're showing instant replay
  if (this.instantReplay.alpha > 0) {
    // Check for end
    if (this.movesIndex < 0) {
      this.stopReplay();
      return;
    }
    // Replay the moves in reverse order
    if (this.instantReplayCounter > 15) {
      this.allowSpecialMovement = true;
      this.move(this.moves[this.movesIndex]);
      this.allowSpecialMovement = false;
      this.movesIndex--;
      this.instantReplayCounter = 0;
    }
    this.instantReplayCounter++;
  }

  // Show hint text
  if (this.hintText.alpha > 0) {
    this.hintDisplayCounter++;
    if (this.hintDisplayCounter > 300) {
      this.hintTextTween.pause();
      this.hintText.alpha = 0;
      this.hintDisplayCounter = 0;
      this.shoveCounter = 0;
    }
  }
};

GameState.prototype.move = function(dir) {
  if (this.win) {
    return;
  }
  // If the title is shown, dismiss first
  if (this.groups.title.alpha > 0) {
    this.title.hide();
    // Show dialog
    this.groups.dialogs.alpha = 1;
    return;
  } else if (this.dialog.alpha > 0) {
    // If there are dialog boxes alive, move them instead
    if (!this.dialog.next()) {
      // Check if we haven't showed the instant replay yet
      if (this.moves.length > 0) {
        this.instantReplayTween.resume();
        this.instantReplayCounter = 0;
        this.dialog.alpha = 0;
        return;
      }
      if (this.levelIndex >= levels.length) {
        // Show end game screen
        console.log('Winner');
        this.win = true;
        this.makeWinScreen();
        return;
      }
      this.dialog.alpha = 0;
      this.map.switchTiles();
    }
    return;
  }

  // Find new grid position to move to
  var grid = {x:this.player.grid.x, y:this.player.grid.y};
  addDir(grid, dir);

  // Normal game movement
  if (this.movesIndex < 0) {
    // Check for out of bounds
    if (grid.x < 0 || grid.y < 0 ||
        grid.x >= SCREEN_WIDTH / TILE_SIZE || grid.y >= SCREEN_HEIGHT / TILE_SIZE) {
      this.sounds.fanfare.play();
      this.dialog.setTexts([getScoreText(this.map, levels[this.levelIndex].day)]);
      this.dialog.alpha = 1;
      this.movesIndex = this.moves.length - 1;
      this.replaying = true;
      // Save progress
      var levelsCompleted =
        parseInt(localStorage["DrunkenViking.levels"]);
      if (localStorage["DrunkenViking.levels"] == null ||
          levelsCompleted < this.levelIndex + 1) {
        localStorage["DrunkenViking.levels"] = this.levelIndex + 1;
      }
      return;
    }
    // Check for wall collision
    if (this.map.isWall(grid)) {
      this.sounds.bump.play('', 0, 0.7);
      this.moves.push(dir);
      this.shoveCounter++;
      if (this.shoveCounter > 5) {
        this.hintTextTween.resume();
        //console.log('show hint');
      }
      //console.log('shove ' + dir);
    } else {
      this.player.move(grid);
      this.sounds.step.play('', 0, 0.7);
      this.moves.push(dirReverse(dir));
      //console.log('move ' + dir);
    }
  } else {
    if (this.allowSpecialMovement) {
      // Reverse game movement
      if (this.map.isRealWall(grid)) {
        this.sounds.bump.play('', 0, 0.7);
      } else {
        this.player.move(grid);
        this.sounds.step.play('', 0, 0.7);
      }
    } else {
      // Trying to move during instant replay
      // Cancel replay and move on
      this.stopReplay();
      return;
    }
  }
  // Destroy items
  var indices = [null];
  if (this.movesIndex < 0) {
    indices = this.map.destroyAt(grid, dir);
  } else {
    // Restore items
    indices = this.map.restoreAt(grid, dir);
  }
  if (indices[0] >= 0) {
    if (indices[0] == 187) {
      this.sounds.cat.play();
    } else if ((indices[0] >= 178 && indices[0] <= 183) || indices[0] == 210) {
      this.sounds.glass.play();
    } else if (indices[0] >= 189 && indices[0] <= 194) {
      this.sounds.smash.play();
    }else {
      this.sounds.breakSound.play();
    }
  } else if (indices[1] >= 0) {
    if (indices[1] == 135) {
      this.sounds.vomit.play();
    } else {
      this.sounds.pickup.play();
      if (this.movesIndex < 0) {
        this.player.clothe();
      } else {
        this.player.strip();
      }
    }
  }
};

GameState.prototype.reset = function(k) {
  this.moves = [];
  this.map.reset();
  this.movesIndex = -1;
  this.player.move(this.map.getBed());
  this.player.strip();
};

GameState.prototype.makeWinScreen = function() {
  this.sounds.tada.play();
  var win = this.game.add.sprite(64, 64, 'win');
  win.width *= 2;
  win.height *= 2;
  var viking = this.game.add.sprite(96, 96, 'viking');
  viking.width *= 2;
  viking.height *= 2;
  viking.animations.add('bob', [0, 1], 4, true);
  viking.animations.play('bob');
  var platino = this.game.add.sprite(SCREEN_WIDTH - 96 - 32, 96, 'platino');
  platino.width *= 2;
  platino.height *= 2;
  platino.animations.add('bob', [0, 1], 4, true);
  platino.animations.play('bob');
};
