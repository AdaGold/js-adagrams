const letterDist = {
  A: 9,
  N: 6,
  B: 2,
  O: 8,
  C: 2,
  P: 2,
  D: 4,
  Q: 1,
  E: 12,
  R: 6,
  F: 2,
  S: 4,
  G: 3,
  T: 6,
  H: 2,
  U: 4,
  I: 9,
  V: 2,
  J: 1,
  W: 2,
  K: 1,
  X: 1,
  L: 4,
  Y: 2,
  M: 2,
  Z: 1,
};

export const drawLetters = () => {
  let letterPool = [];
  //create letter pool from letter distribution
  for (let letter in letterDist) {
    for (let i = 0; i < letterDist[letter] + 1; i++) {
      letterPool.push(letter);
    }
  }
  let hand = [];
  for (let i = 1; i < 11; i++) {
    let randomIndex = Math.random() * letterPool.length;
    let drawnLetter = letterPool[randomIndex];
    hand.push(drawnLetter);
  }
  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  for (let letter of input) {
    if (lettersInHand.includes(letter)) {
      let i = lettersInHand.indexOf(letter);
      lettersInHand.splice(i, 1);
    } else {
      return false;
    }
    return true;
  }
};

export const scoreWord = (word) => {
  // create dictionary with score for each letter
  let letterScore = {};
  const buildScoreDict = (letters, score) => {
    for (const letter of letters) {
      letterScore[letter] = score;
    }
  };

  buildScoreDict(["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"], 1);
  buildScoreDict(["D", "G"], 2);
  buildScoreDict(["B", "C", "M", "P"], 3);
  buildScoreDict(["F", "H", "V", "W", "Y"], 4);
  buildScoreDict(["K"], 5);
  buildScoreDict(["J", "X"], 8);
  buildScoreDict(["Q", "Z"], 10);

  // calculate score
  let score = 0;
  for (let letter of word) {
    score += letterScore[letter];
  }
  return score;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
  let max = 0;
  let highestScoreWord = "";
  for (const word in words) {
    if (scoreWord(word) > max) {
      max = scoreWord(word);
      highestScoreWord = word;
    } else if (scoreWord(word) === max) {
      if (word.length < highestScoreWord.length) {
        highestScoreWord = word;
      }
    }
  }
  output = {
    word: highestScoreWord,
    score: max,
  };
  return output;
};
