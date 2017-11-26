let PreloadState ={
  preload: function() {
    // add sprites for logos and loading bar
    this.loadingBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBar');
    this.loadingBar.anchor.setTo(.5); // center anchor to midddle of bar
    this.load.setPreloadSprite(this.loadingBar); // crops arg image depening on load percentage
    // preload assets here
    this.load.image('actionButton', '../../assets/images/actionButton.png');
    this.load.image('movementButton', '../../assets/images/movementButton.png');
    this.load.image('barrel', '../../assets/images/barrel.png');
    this.load.image('platform', '../../assets/images/platform.png');
    this.load.image('ground', '../../assets/images/ground.png');
    this.load.spriteSheet('fire', '../../assets/images/fire_spritsheet.png');
    this.load.spriteSheet('player', '../../assets/images/player_spritesheet.png');
  },
  create: function() {
    console.log('Now in PreloadState');
    this.state.start('HomeState'); // start gameState
  },
}
