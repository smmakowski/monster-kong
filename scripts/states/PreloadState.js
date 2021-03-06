let PreloadState = {
  preload: function() {
    // add sprites for logos and loading bar
    this.loadingBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBar');
    this.loadingBar.anchor.setTo(.5); // center anchor to midddle of bar
    this.load.setPreloadSprite(this.loadingBar); // crops arg image depening on load percentage
    // preload assets here
    this.load.image('actionButton', '../../assets/images/actionButton.png');
    this.load.image('movementButton', '../../assets/images/arrowButton.png');
    this.load.image('barrel', '../../assets/images/barrel.png');
    this.load.image('platform', '../../assets/images/platform.png');
    this.load.image('ground', '../../assets/images/ground.png');
    this.load.image('gorilla', '../../assets/images/gorilla3.png');
    this.load.spritesheet('fire', '../../assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1);
    this.load.spritesheet('player', '../../assets/images/player_spritesheet.png', 28, 30, 5, 1, 1);

    // load level text files
    this.load.text('level1', '../../assets/level_data/level_2.json');
    this.load.text('level2', '../../assets/level_data/level_2.json');
  },
  create: function() {
    console.log('Now in PreloadState');
    game.state.start('HomeState'); // start gameState
  },
}
