// game state object
let GameState = {
  create: function() { // create scene here
    const self = this;
  	// place background and add other sprites
    console.log('Now in GameState!');
    this.ground = this.add.sprite(0, 500, 'ground');
    this.game.physics.arcade.enable(this.ground); //enable physics for entity
    this.ground.body.allowGravity = false; // prevents gravity from affecting background
    this.ground.body.immovable = true;
    console.log(self.ground.body); // check out attributes of body in console

    let platform = this.add.sprite(0, 300, 'platform');
    this.game.physics.arcade.enable(platform);
    platform.body.allowGravity = false;
    platform.body.immovable = true; // prevents movement due to colision

    this.player = this.add.sprite(100, 200, 'player', 3);
    this.player.anchor.setTo(.5);
    this.player.animations.add('walk', [0, 1, 2, 1], 6, true);
    this.game.physics.arcade.enable(this.player);

    this.player.animations.play('walk'); // play animation
  },
  update: function() { // update methid
  	// update will run overthing under this method periodically during runtime
  },
};
