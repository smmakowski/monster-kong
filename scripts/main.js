// create phaser game
let game = new Phaser.Game(360, 592, Phaser.AUTO); // init new Game; pahser will automatically append a canvas
// make sure to change the dimenions of your canvas as needed
game.state.add('BootState', BootState); // preload loading assets, and set window ratios
game.state.add('PreloadState', PreloadState); // preload game and home assets and be loading screen
game.state.add('HomeState', HomeState); // home screen state/main menu
game.state.add('GameState', GameState); // add GameState this is where the main game will occur
game.state.start('BootState'); // start game state
