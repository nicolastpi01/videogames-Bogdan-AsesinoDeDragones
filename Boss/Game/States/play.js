var pinches;
var play = {

    preload: function() {},

    create: function() {
        this.createMap();
        this.createBogdan();
        this.createEnemies();
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
        game.debug.body(bogdan);
    },

    //-----------------------------------------

    createMap: function() {
        //var background =  game.add.tilemap('background');
        game.add.sprite(0, 0, 'background');

        //Hacer que se repita el background infinitamente...
        map = game.add.tilemap('map');
        map.addTilesetImage('Tiles_32x32');

        //map.add.sprite('background');
        map.setCollisionBetween(1, 28);

        layer = map.createLayer(0);
        layer.resizeWorld();
        layer.debugSettings.forceFullRedraw = true;
        pinches = map.createLayer(2);

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

    //-------------------------------------

    checkCollitions: function() {
        game.physics.arcade.collide(bogdan, layer);
        game.physics.arcade.collide(enemies, layer);
        game.physics.arcade.overlap(bogdan, pinches, this.muerte);
        game.physics.arcade.overlap(enemies, pinches, this.muerte);
        game.physics.arcade.overlap(bogdan, enemies, this.processOverlap);
    },



    processInput: function() {
        bogdan.processInput(cursors, spacebar, ctrl);
    },

    processEnemyMovement: function() {
        enemies.forEach(function(e) { e.processMovement(); });
    },

    muerte: function(victima, p) {
        //game.plugins.screenShake.shake(5);
        victima.kill();
    },

    processOverlap: function(bodgan, e) {
        text.setText('Life: ' + bogdan.getLife());

        //game.plugins.screenShake.shake(5);

        if (bogdan.body.velocity.y > 0) {
            bogdan.bounce();
            e.kill();
        } else {
            bogdan.life -= 1;
            bogdan.bounceBack();
        }
    },

    checkLose: function() {
        if (bogdan.isDead()) {
            game.state.start('gameover');
        }
    },

    showLife: function() {
        text = game.add.text(2, 1, "Life: " + bogdan.getLife(), { font: "32px Courier", fill: "#ffffff" });
        text.fixedToCamera = true;
    },
};