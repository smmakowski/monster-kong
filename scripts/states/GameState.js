// game state object
let GameState = {
  init: function(level, lives, score) {
    // note cursors can be set differnlyy depengin on state state did not work in Boot
    this.cursors = this.game.input.keyboard.createCursorKeys(); // enables arrow keys
    this.game.world.setBounds(0, 0, 360, 700); // (leftMostCornerX, leftMostCornerXY, width, height)
    this.RUNNING_SPEED = 180; // set running and jump global speeds
    this.JUMPING_SPEED = 550;
    // passable parameters for level changes (with defaults for new gmae)
    this.level = level || 1; // pass level
    this.lives = lives || 5; // pass current lives
    this.score = score || 0; // pass score from previous level or zero
  },
  create: function() { // create scene here
    const self = this;
  	// place background and add other sprites
    console.log('Now in GameState!');
    this.ground = this.add.sprite(0, 638, 'ground');
    this.game.physics.arcade.enable(this.ground); //enable physics for entity
    this.ground.body.allowGravity = false; // prevents gravity from affecting background
    this.ground.body.immovable = true;
    console.log(self.ground.body); // check out attributes of body in console

    const platformData = [
      {x: 0, y: 430},
      {x: 45, y: 560},
      {x: 90, y: 290},
      {x: 0, y: 140}
    ];
    console.log('Current level is ', self.level);
    this.levelData = JSON.parse(this.game.cache.getText('level' + this.level));

    this.platforms = this.add.group(); // create group for platforms
    this.platforms.enableBody = true; // enable body attribute for physcis

    this.levelData.platformData.forEach(function(coord) {
      this.platforms.create(coord.x, coord.y, 'platform'); // create platforms based on data
    }, this);

    this.platforms.setAll('body.immovable', true); // set property for all sprties in group
    this.platforms.setAll('body.allowGravity', false); // prevents all from falling

    this.fires = this.add.group();
    this.fires.enableBody = true;

    this.levelData.fireData.forEach(function(coord) {
      let fire = this.fires.create(coord.x, coord.y, 'fire'); //add fire to group
      fire.animations.add('fire', [0, 1], 4, true); // add animation for fire
      fire.play('fire'); // pla animation for fire
    }, this);

    this.fires.setAll('body.allowGravity', false);

    this.goal = this.add.sprite(this.levelData.goalLocation.x, this.levelData.goalLocation.y, 'gorilla');
    this.game.physics.arcade.enable(this.goal); //enable physics for entity
    this.goal.body.allowGravity = false;

    this.player = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player', 3);
    this.player.anchor.setTo(.5);
    this.player.customParams = {mustJump: false, mustGoLeft: false, mustGoRight: false};
    this.player.animations.add('walk', [0, 1, 2, 1], 6, false);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.levelText = this.add.text(275, 30, 'Level: ' + this.levelData.level, levelTextStyle);
    this.levelText.fixedToCamera = true;

    this.addOnScreenControls(); // add onscreen controls

    this.game.camera.follow(this.player); // follow player with camera
    // create barrels

    this.barrels = this.add.group();
    this.barrels.enableBody = true; // enables physcics ffor groups

    this.createBarrel(); // create a barrel
    this.barrelCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.barrelFrequency, this.createBarrel, this);
  },
  update: function() { // update methid
    //the below metods also acept calback
  	// update will run overthing under this method periodically during runtime
    this.game.physics.arcade.collide(this.player, this.ground); // checks if theyr arein promimity (when you want things to interfers)
    this.game.physics.arcade.collide(this.player, this.platforms); // alternatively you can use .overlap to check if overlapping (when things are in the sam space but dont interfere)
    this.game.physics.arcade.overlap(this.player, this.fires, this.killPlayer);
    this.game.physics.arcade.overlap(this.player, this.goal, this.winLevel);
    // allow barrels to collide with platforms and ground
    this.game.physics.arcade.collide(this.barrels, this.ground);
    this.game.physics.arcade.collide(this.barrels, this.platforms);
    // allow barrel ad player colliosn
    this.game.physics.arcade.overlap(this.player, this.barrels, this.killPlayer);
    // the players speed is always 0 (not moving if )
    this.player.body.velocity.x = 0; //reset the movement to 0
    // handling for left and right
    if ((this.cursors.left.isDown  && !this.cursors.right.isDown)||
    (this.player.customParams.mustGoLeft && !this.player.customParams.mustGoRight)) { //prevent holdig both at same time
      // this.player.scale.setTo(1);
      // this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.moveLeft();
    } else if ((this.cursors.right.isDown  && !this.cursors.left.isDown) ||
    (this.player.customParams.mustGoRight && !this.player.customParams.mustGoLeft)) {
      // this.player.scale.setTo(-1, 1);
      // this.player.body.velocity.x = this.RUNNING_SPEED;
      this.moveRight();
    } else {
      this.player.animations.stop();
      this.player.frame = 3;
    }
    // handling for jumping
    if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) { //.touching checks to see if sprite is currently touching osmeting on edge ex .down
      this.jump();
    }

    // set zone to kill barrels, and
    this.barrels.forEach(function(barrel) {
      if (barrel.x < 10 && barrel.y > 600) {
        barrel.kill();
      }
    }, this);
  },
  addOnScreenControls: function() {
    const self = this;
    this.leftButton = this.add.button(48, 565, 'movementButton');
    this.rightButton = this.add.button(144, 565, 'movementButton');
    this.jumpButton = this.add.button(312, 565, 'actionButton');
    let buttons = [this.leftButton, this.rightButton, this.jumpButton];

    // set opacity for buttons and enable input;
    buttons.forEach(function(button) {
      button.anchor.setTo(.5);
      button.alpha = .4;
      button.inputEnabled = true;
      button.fixedToCamera = true; // allows buttons to remain in same X/Y when camera moves
    });
    // handle jump button
    this.jumpButton.events.onInputDown.add(function(button, event) {
      button.scale.setTo(.8);
      self.player.customParams.mustJump = true;
    });

    this.jumpButton.events.onInputUp.add(function(button, event) {
      button.scale.setTo(1);
      this.player.customParams.mustJump = false;
    }, this);
    // handle left and right buttons

    this.leftButton.events.onInputDown.add(function(button, event) {
      button.scale.setTo(.8);
      self.player.customParams.mustGoLeft = true;
    });

    this.leftButton.events.onInputUp.add(function(button, event) {
      button.scale.setTo(1);
      this.player.customParams.mustGoLeft = false;
    }, this);

    this.rightButton.events.onInputDown.add(function(button, event) {
      button.scale.setTo(.8);
      self.player.customParams.mustGoRight = true;
    });

    this.rightButton.events.onInputUp.add(function(button, event) {
      button.scale.setTo(1);
      this.player.customParams.mustGoRight = false;
    }, this);

  },
  moveLeft: function() {
    this.player.scale.setTo(1);
    this.player.body.velocity.x = -this.RUNNING_SPEED;
    this.player.animations.play('walk'); // play animation
  },
  moveRight: function() {
    this.player.scale.setTo(-1, 1);
    this.player.body.velocity.x = this.RUNNING_SPEED;
    this.player.animations.play('walk'); // play animation
  },
  jump: function() {
    this.player.body.velocity.y = -this.JUMPING_SPEED;
  },
  killPlayer: function() {
    console.log('DEAD!');
    game.state.start('GameState');
  },
  winLevel: function() {
    const self = this;
    console.log('GOAL REACHED!');
      game.state.start('GameState', true, false, 2, self.lives, self.score);
  },
  createBarrel: function() {
    // get first 'dead' sprite
    //phaser keeps track of alive and dead sprite (if you kill a sprite its not necessaryly eleted )
    let barrel = this.barrels.getFirstExists(false); // assigns to first dead sprite if pass false

    if (!barrel) { // no dead spreites
        barrel = this.barrels.create(0, 0, 'barrel'); // creae one
    }
    barrel.body.collideWorldBounds = true;
    barrel.body.bounce.set(1, 0);

    barrel.reset(this.levelData.goalLocation.x, this.levelData.goalLocation.y);
    barrel.body.velocity.x = this.levelData.barrelSpeed;
  },
};
