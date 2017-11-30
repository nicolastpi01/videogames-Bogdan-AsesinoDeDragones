var play = {
    preload: function() {},

    create: function() {
        //this.createMap();
        this.addMap();
        this.createBogdan();
        this.createEnemyWalls();
        this.createEnemies();
        this.createLifes();
        this.showLife();

        game.camera.follow(bogdan);
    },

    update: function() {
        this.checkCollitions();
        this.processInput();
        this.processEnemyMovement();
        this.checkLose();
    },

    render: function() {
        //game.debug.body(bogdan);
        //walls.forEach(function(b){game.debug.body(b);});
        //enemies.forEach(function(b){game.debug.body(b);});
    },

    //-----------------------------------------

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
    proxNivel: function(){
        text = game.add.text(2, 1, "Prox nivel ", { font: "32px Courier", fill: "#ffffff" });
        text.fixedToCamera = true;
    
	   game.state.start('load');
    },

    checkCollitions: function() {
        game.physics.arcade.collide(bogdan, layer);
        game.physics.arcade.collide(enemies, layer);
        game.physics.arcade.collide(enemies, walls);
        game.physics.arcade.collide(lifes, layer);
        game.physics.arcade.collide(bogdan, enemies, this.processCollition);
        game.physics.arcade.overlap(bogdan, lifes, this.addLife);
        game.physics.arcade.overlap(bogdan.weapon.bullets, enemies, this.processHit);
    },

    muerte: function() {
        console.log('Se murio!');
        bogdan.life = 0;
    },

    processInput: function() {
        bogdan.processInput(cursors, spacebar, ctrl);
    },

    processEnemyMovement: function() {
        enemies.forEach(function(e) { e.processMovement(); });
    },

    processCollition: function(bodgan, e) {
        bogdan.processJumpKill(e, text);
    },

    addLife: function(bogdan, l){
        l.kill();
        if(bogdan.life < 3){
            bogdan.life += 1;
            var h = game.add.sprite(hearts.getAt(bogdan.life-2).x + 35, 10, 'heart');
            h.scale.setTo(0.07);
            hearts.add(h);
        }
    },

    processHit: function(weapon, e){
        weapon.kill();
        bogdan.processHit(e);
    },

    checkLose: function() {
        if (bogdan.isDead()) {
            game.state.start('load');
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

    addMap: function() {
        map = game.add.tilemap('map1');
        map.addTilesetImage('Tiles_32x32');

        map.setCollisionBetween(1, 23);
        map.setCollisionBetween(25, 28);
        map.setCollisionBetween(30, 37);
        map.setCollisionBetween(45, 64);

        map.setTileIndexCallback(47, this.muerte, this);
        map.setTileIndexCallback(51, this.proxNivel, this);

        layer = map.createLayer(0);        
        layer.resizeWorld();
        layer.debugSettings.forceFullRedraw = true;
    },

    createEnemyWalls: function(){
        walls = game.add.group();

        var data = game.cache.getJSON('walls');

        data.forEach(function(w) {
            walls.add(new EnemyWall(game, w.x, w.y, 'wall'));
        });
    }
};
