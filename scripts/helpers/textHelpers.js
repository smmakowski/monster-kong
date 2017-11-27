function createHeartString(heartCount) {
  let hearts = '';

  for (let i = 0; i < heartCount; i++) {
    hearts += '❤'; // add heart for each life
  }

  return hearts;
};

function createScoreString(score) {
  let scoreString = '';
  let scoreLength = score.toString().length; // turn to string
  let diff = 7 - scoreLength; // get missing zero count

  for (let j = 0; j < diff; j++) {
    scoreString += '0'; //fill zeros;
  }

  scoreString += score; // concat with actual score
  return scoreString;
};

module.exports = {
  createHeartString: createHeartString,
  createScoreString: createScoreString,
}
