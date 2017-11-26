let HomeState = {
  init: function(message) {
      // method to initialize state
      this.message = 'Click or Touch Text\nTo go to\nGame State';
  },
  create: function() {
    // add sprites
    const self = this;
    console.log('Now on HomeState!');
    console.log(self.cursors);
    this.homeText = this.add.text(this.game.world.centerX, this.game.world.centerY, this.message, homeTextStyle);
    this.homeText.anchor.setTo(.5);
    this.homeText.inputEnabled = true;
    this.homeText.events.onInputDown.add(this.startGame, this);
    // call start method to enter game state (set as event handler)
  },

  startGame: function() {
    this.state.start('GameState');
  }
}
