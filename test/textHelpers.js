const chai = require('chai');
const textHelpers = require('../scripts/helpers/textHelpers.js');
const expect = chai.expect;

//sample tests
describe('Text Display Helpers', () => {
  describe('createHeartString', () => {
    const hearts = 5;
    const heartString = textHelpers.createHeartString(hearts);

    it('should return a string', function() {
      expect(heartString).to.be.a('string');
    });
    it('return string\'s length should be same as passed argument', function() {
      expect(heartString).to.have.lengthOf(hearts);
    });
    it('should comprise of all heart emojis', function() {
      let allHearts = true;
      for (let i = 0; i < heartString.length; i++) {
        if (heartString[i] !== '❤') {
          allHearts = false;
        }
      }
      expect(allHearts).to.equal(true);
    });
  });
  describe('createScoreString', () => {
    const score = 10000;
    const scoreString = textHelpers.createScoreString(score);

    it('should return a string', function() {
      expect(scoreString).to.be.a('string');
    });
    it('return string\'s length should be 7', function() {
      expect(scoreString).to.have.lengthOf(7);
    });
    it('return string should be parseable to number equal to original argument', function() {
      const parsedScore = parseInt(scoreString);
      expect(parsedScore).to.equal(score);
    });
  });
});
