let GameOverState = {
  init: function(message, score) {
      // method to initialize state
      this.message = message;
      this.finalScore = createScoreString(score);
  },
  create: function() {
    // add sprites
    const self = this;
    console.log('Now on GameOverState!');
    console.log(self.cursors);
    this.gameOverText = this.add.text(180, 100, 'GAME OVER', gameOverTextStyle);
    this.gameOverText.anchor.setTo(.5);

    this.finalScoreText = this.add.text(180, 150, 'Final Score: ' + this.finalScore, livesTextStyle);
    this.finalScoreText.anchor.setTo(.5);

    this.messageText = this.add.text(180, 350, this.message, gameOverMessageTextStyle);
    this.messageText.anchor.setTo(.5);

    this.restartText = this.add.text(180, 450, 'Touch or Click\nthis text to restart', homeTextStyle);
    this.restartText.anchor.setTo(.5);
    this.restartText.inputEnabled = true;
    this.restartText.events.onInputDown.add(this.restartGame, this);

    // call start method to enter game state (set as event handler)
  },
  restartGame: function() {
    this.state.start('HomeState');
  }
}
