var pinches;
var play = {
    preload: function() {},

    create: function() {
        this.createMap();
        this.createBogdan();
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
    },

    //-----------------------------------------

    createMap: function() {
        //var background =  game.add.tilemap('background');
        game.add.sprite(80, 0, 'background');

        map = game.add.tilemap('map');
        map.addTilesetImage('Tiles_32x32');
        
        //map.add.sprite('background');
        
        map.setCollisionBetween(1, 28); //era 12

        layer = map.createLayer(0);
        layer.resizeWorld();
        layer.debugSettings.forceFullRedraw = true;

        //pinches = map.createLayer(2);

        //pinches.debugMap();

        //layer_vida = game.sprite('vida').createLayer(0);
        //layer_vida.scale.set(0.4);
        //game.add.sprite(10, 40, layer_vida)
        //.scale.set(0.4, 0.4);
    },

    createBogdan: function() {
        bogdan = new Knight(game, 50, 500, 'knight');
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

    checkCollitions: function() {
        game.physics.arcade.collide(bogdan, layer);
        game.physics.arcade.collide(enemies, layer);
        game.physics.arcade.collide(lifes, layer);
        game.physics.arcade.overlap(bogdan, enemies, this.processOverlap);
        game.physics.arcade.overlap(bogdan, lifes, this.addLife);
        game.physics.arcade.overlap(bogdan.weapon.bullets, enemies, this.processHit);
    },

    //muerte: function(victima, p) {
        //game.plugins.screenShake.shake(5);
        //victima.kill();
    //},

    processInput: function() {
        bogdan.processInput(cursors, spacebar, ctrl);
    },

    processEnemyMovement: function() {
        enemies.forEach(function(e) { e.processMovement(); });
    },    

    processOverlap: function(bodgan, e) {
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
        bogdan.processHit(e);
    },
    
    checkLose: function() {
        if (bogdan.isDead()) {
            game.state.start('gameover');
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
};