// game state object
let GameState = {
  init: function() {
    // note cursors can be set differnlyy depengin on state state did not work in Boot
    this.cursors = this.game.input.keyboard.createCursorKeys(); // enables arrow keys
    this.game.world.setBounds(0, 0, 360, 700); // (leftMostCornerX, leftMostCornerXY, width, height)
    this.RUNNING_SPEED = 180; // set running and jump global speeds
    this.JUMPING_SPEED = 550;
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

    this.platforms = this.add.group(); // create group for platforms
    this.platforms.enableBody = true; // enable body attribute for physcis

    platformData.forEach(function(coord) {
      this.platforms.create(coord.x, coord.y, 'platform'); // create platforms based on data
    }, this);

    this.platforms.setAll('body.immovable', true); // set property for all sprties in group
    this.platforms.setAll('body.allowGravity', false); // prevents all from falling

    this.player = this.add.sprite(10, 545, 'player', 3);
    this.player.anchor.setTo(.5);
    this.player.customParams = {mustJump: false, mustGoLeft: false, mustGoRight: false};
    this.player.animations.add('walk', [0, 1, 2, 1], 6, false);
    this.game.physics.arcade.enable(this.player);
    this.addOnScreenControls();

    this.game.camera.follow(this.player); // follow player with camera
  },
  update: function() { // update methid
    //the below metods also acept calback
  	// update will run overthing under this method periodically during runtime
    this.game.physics.arcade.collide(this.player, this.ground); // checks if theyr arein promimity (when you want things to interfers)
    this.game.physics.arcade.collide(this.player, this.platforms); // alternatively you can use .overlap to check if overlapping (when things are in the sam space but dont interfere)

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
    }
    // handling for jumping
    if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) { //.touching checks to see if sprite is currently touching osmeting on edge ex .down
      this.jump();
    }
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
  }
};
