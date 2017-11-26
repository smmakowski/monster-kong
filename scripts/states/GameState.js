// game state object
let GameState = {
  init: function() {
    // note cursors can be set differnlyy depengin on state state did not work in Boot
    this.cursors = this.game.input.keyboard.createCursorKeys(); // enables arrow keys
    this.RUNNING_SPEED = 180; // set running and jump global speeds
    this.JUMPING_SPEED = 550;
  },
  create: function() { // create scene here
    const self = this;
  	// place background and add other sprites
    console.log('Now in GameState!');
    this.ground = this.add.sprite(0, 500, 'ground');
    this.game.physics.arcade.enable(this.ground); //enable physics for entity
    this.ground.body.allowGravity = false; // prevents gravity from affecting background
    this.ground.body.immovable = true;
    console.log(self.ground.body); // check out attributes of body in console

    this.platform = this.add.sprite(0, 300, 'platform');
    this.game.physics.arcade.enable(this.platform);
    this.platform.body.allowGravity = false;
    this.platform.body.immovable = true; // prevents movement due to colision

    this.player = this.add.sprite(100, 200, 'player', 3);
    this.player.anchor.setTo(.5);
    this.player.customParams = {mustJump: false, mustGoLeft: false, mustGoRight: false};
    this.player.animations.add('walk', [0, 1, 2, 1], 6, false);
    this.game.physics.arcade.enable(this.player);
    this.addOnScreenControls();
  },
  update: function() { // update methid
    //the below metods also acept calback
  	// update will run overthing under this method periodically during runtime
    this.game.physics.arcade.collide(this.player, this.ground); // checks if theyr arein promimity (when you want things to interfers)
    this.game.physics.arcade.collide(this.player, this.platform); // alternatively you can use .overlap to check if overlapping (when things are in the sam space but dont interfere)

    // the players speed is always 0 (not moving if )
    this.player.body.velocity.x = 0; //reset the movement to 0
    // handling for left and right
    if (this.cursors.left.isDown || this.player.customParams.mustGoLeft) {
      // this.player.scale.setTo(1);
      // this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.moveLeft();
    } else if (this.cursors.right.isDown || this.player.customParams.mustGoRight) {
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
    this.leftButton = this.add.button(this.game.world.width * .15, this.game.world.height * .92, 'movementButton');
    this.rightButton = this.add.button(this.game.world.width * .4, this.game.world.height * .92, 'movementButton');
    this.jumpButton = this.add.button(this.game.world.width * .85, this.game.world.height * .92, 'actionButton');
    let buttons = [this.leftButton, this.rightButton, this.jumpButton];

    // set opacity for buttons and enable input;
    buttons.forEach(function(button) {
      button.anchor.setTo(.5);
      button.alpha = .4;
      button.inputEnabled = true;
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
