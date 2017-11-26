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
    this.player.animations.add('walk', [0, 1, 2, 1], 6, true);
    this.game.physics.arcade.enable(this.player);

    this.player.animations.play('walk'); // play animation
  },
  update: function() { // update methid
    //the below metods also acept calback
  	// update will run overthing under this method periodically during runtime
    this.game.physics.arcade.collide(this.player, this.ground); // checks if theyr arein promimity (when you want things to interfers)
    this.game.physics.arcade.collide(this.player, this.platform); // alternatively you can use .overlap to check if overlapping (when things are in the sam space but dont interfere)

    // the players speed is always 0 (not moving if )
    this.player.body.velocity.x = 0; //reset the movement to 0
    // handling for left and right
    if (this.cursors.left.isDown) {
      this.player.scale.setTo(1);
      this.player.body.velocity.x = -this.RUNNING_SPEED;
    } else if (this.cursors.right.isDown) {
      this.player.scale.setTo(-1, 1);
      this.player.body.velocity.x = this.RUNNING_SPEED;
    }
    // handling for jumping
    if (this.cursors.up.isDown && this.player.body.touching.down) { //.touching checks to see if sprite is currently touching osmeting on edge ex .down
      this.player.body.velocity.y = -this.JUMPING_SPEED;
    }
  },


};
