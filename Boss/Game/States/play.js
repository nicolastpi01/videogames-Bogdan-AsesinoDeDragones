var play = {
    
    preload: function() {},

    create: function() {
        
        //this.createMap();
        this.addMap('map1');
        this.createBogdan();
        this.createEnemyWalls();
        this.createEnemies();
        this.createLifes();
        this.createCoins();
        this.showLife();
        //game.camera.follow(bogdan);
        game.camera.follow(bogdan, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        text = game.add.text(1150, 1, bogdan.points, { font: "32px Courier", fill: "#ffffff" });
        text.fixedToCamera = true;

        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.input.onDown.add(this.gofull, this);
        //this.proxNivel(bogdan);
    },

    update: function() {
        game.bostezo.pause();
        //if(dragonvolador.life == 0 ||  dragonidle.life == 0 ){
            //game.bostezo.stop();      
        //}
        //enemies.forEach(function(l) {
            //if(l.life==0)
                //enemies.remove(l);
            //});

        if(boss != null){
            game.physics.arcade.collide(bogdan, boss, bogdan.bossCollition);
            game.physics.arcade.overlap(bogdan.weapon.bullets, boss, this.processHit);
            if(boss.life == 0){
                boss.destroy(true);
                boss = null;
            }
        }
    },

    render: function() {
        //game.debug.body(bogdan);
        //walls.forEach(function(w){game.debug.body(w);});
        //enemies.forEach(function(e){game.debug.body(e);});
        //coins.forEach(function(c){game.debug.body(c);});
        //if(boss != null){ game.debug.body(boss); }
    },

    //-----------------------------------------

    processHit: function(bullet, enemy){
        bogdan.processBossHit(bullet, enemy);
    },

    gofull: function() {
        if (game.scale.isFullScreen){
            game.scale.stopFullScreen();
        }else{
            game.scale.startFullScreen(false);
        }
    },

    createMap: function() {
        game.add.sprite(0, 0, 'background');
        game.add.sprite(1250, 0, 'background');

        map = game.add.tilemap('map');
        map.addTilesetImage('Tiles_32x32');
        map.setCollisionBetween(1, 28);
        map.setCollisionBetween(47, 47);
        map.setTileIndexCallback(47, this.muerte, this);
	    map.setCollisionBetween(50,50);
	    map.setTileIndexCallback(50, this.proxNivel, this);
	    map.setCollisionBetween(56,63);

        layer = map.createLayer(0);
        layer.resizeWorld();
        layer.debugSettings.forceFullRedraw = true;
    },

    createBogdan: function() {
        bogdan = new Knight(game, 50, 864, 'knight');
    },

    createEnemies: function() {
        enemies = game.add.group();

        var data = game.cache.getJSON('level_0');

        data.forEach(function(e) {
            switch (e.type) {
                case 'mummy':
                    enemies.add(new Mummy(game, e.x, e.y, 'mummy'));
                    break;
                case 'monster':
                    enemies.add(new Monster(game, e.x, e.y, 'monster'));
                    break;
                case 'zombie':
                    enemies.add(new Zombie(game, e.x, e.y, 'zombie'));
                    break;
                case 'skeleton':
                    enemies.add(new Skeleton(game, e.x, e.y, 'skeleton'));
                    break;
                case 'dragon':
                    enemies.add(new Dragon(game, e.x, e.y, 'dragon'));
                    break;
                case 'slime':
                    enemies.add(new Slime(game, e.x, e.y, 'slime'));
                    break;
            }
        });
    },

    createLifes: function(){
        lifes = game.add.group();

        var data = game.cache.getJSON('lifes');

        data.forEach(function(l) {
            lifes.add(new Life(game, l.x, l.y, 'life'));
        });
    },

    //-------------------------------------
    
    proxNivel: function(sprite){
        if(sprite === bogdan){
            enemies.destroy(true);
            lifes.destroy(true);
            coins.destroy(true);
            walls.destroy(true);
            hearts.destroy(true);
            map.destroy();

            this.addMap('bossMap');

            var p = bogdan.points;
            var l = bogdan.life;
            bogdan = new Knight(game, 100, 500, 'knight');
            bogdan.points = p;
            bogdan.life = l;

            boss = new Boss(game, 1000, 500, 'BDragonI');
            game.camera.follow(bogdan, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
            text = game.add.text(1150, 1, bogdan.points, { font: "32px Courier", fill: "#ffffff" });
            text.fixedToCamera = true;

            this.showLife();

            
        }
    },   

    muerte: function(sprite) {
        if(sprite === bogdan){
            bogdan.life = 0;
        } 
    },    

    showLife: function() {
        hearts = game.add.group();

        var posX = 10;

        for (i = 0; i < bogdan.getLife(); i++) {
            h = game.add.sprite(posX, 10, 'heart');
            h.scale.setTo(0.07);
            hearts.add(h);
            posX += 35;
        }

        hearts.fixedToCamera = true;
    },

    addMap: function(m) {
        //game.stage.backgroundColor = '#697e96';

        background = game.add.tileSprite(0, 0, 1250, 750, 'background0');
        background.fixedToCamera = true;

        map = game.add.tilemap(m);
        map.addTilesetImage('Tiles_32x32');

        map.setCollisionBetween(1, 23, true, 1);
        map.setCollisionBetween(25, 28, true, 1);
        map.setCollisionBetween(30, 37, true, 1);
        map.setCollisionBetween(45, 64, true, 1);

        map.setTileIndexCallback(47, this.muerte, this, 1);
        map.setTileIndexCallback(51, this.proxNivel, this, 1);

        map.createLayer(0);

        layer = map.createLayer(1);
        layer.resizeWorld();
        layer.debugSettings.forceFullRedraw = true;

        //map.createLayer(2);
    },

    createEnemyWalls: function(){
        walls = game.add.group();

        var data = game.cache.getJSON('walls');

        data.forEach(function(w) {
            walls.add(new EnemyWall(game, w.x, w.y, 'wall'));
        });
    },

    createCoins: function(){
        coins = game.add.group();

        var data = game.cache.getJSON('coins');

        data.forEach(function(c) {
            coins.add(new Coin(game, c.x*32, c.y*32, 'coin'));
        });
    }

    //checkCollitions: function() {
        //game.physics.arcade.collide(bogdan, layer);
        //game.physics.arcade.collide(enemies, layer);
        //game.physics.arcade.collide(coins, layer);
        //game.physics.arcade.collide(enemies, walls);
        //game.physics.arcade.collide(lifes, layer);
        //game.physics.arcade.collide(bogdan, enemies, this.processCollition);
        //game.physics.arcade.overlap(bogdan, lifes, this.addLife);
        //game.physics.arcade.overlap(bogdan.weapon.bullets, enemies, this.processHit);
        //game.physics.arcade.collide(bogdan, coins, this.coinCollition);
    //},

    //coinCollition: function(h, c){
      //  c.kill();
        //bogdan.addpts(100);
        //text.setText(bogdan.points);
    //}

    //addLife: function(bogdan, l){
        //l.kill();
        //if(bogdan.life < 3){
            //bogdan.life += 1;
            //var h = game.add.sprite(hearts.getAt(bogdan.life-2).x + 35, 10, 'heart');
            //h.scale.setTo(0.07);
            //hearts.add(h);
        //}
    //},

    //processHit: function(weapon, e){
        //weapon.kill();
        //game.golpeknight.play();
        //bogdan.processHit(e);
        //text.setText(bogdan.points);
    //},

    //checkLose: function() {
        //if (bogdan.isDead()) {
          //  game.state.start('load');
        //}
    //},

     //processInput: function() {
        //bogdan.processInput(cursors, jumpButton, attackButton);
        //if(bogdan.isAttacking())
        //    game.lanzafuego.play();
    //},

    //processEnemyMovement: function() {
        //enemies.forEach(function(e) { e.processMovement(); });
    //},

    //processCollition: function(bodgan, e) {
        //game.pisarknight.play();
       // bogdan.processJumpKill(e, text);
        //text.setText(bogdan.points);
    //},

};
