let BootState = {
  init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignVertically = true;
    this.scale.pageAlignHorizontally = true;

    // add physics engine in boot
    this.game.physics.startSystem(Phaser.Physics.ARCADE); // arcade phhyscis are not memory heave
    this.game.physics.arcade.gravity.y = 1000; // set gravity (via trial and error) y means vertical x is horixonal
  },
  preload: function() {
    //preload assets for PreloadState
    this.load.image('loadingBar', '../../assets/images/bar.png');

  },
  create: function() {
    //set stage background as white, start PreloadState
    console.log('Now in Bootstate');
    this.state.start('PreloadState');
  }
}
