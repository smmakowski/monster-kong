// game state object
let GameState = {
  create: function() { // create scene here
  	// place background and add other sprites
    console.log('Now in GameState!');
    this.ground = this.add.sprite(0, 500, 'ground');

    let platform = this.add.sprite(0, 300, 'platform');

    this.player = this.add.sprite(100, 200, 'player', 3);
    this.player.anchor.setTo(.5);
    this.player.animations.add('walk', [0, 1, 2, 1], 6, true);
    this.player.animations.play('walk');
  },
  update: function() { // update methid
  	// update will run overthing under this method periodically during runtime
  },
};
