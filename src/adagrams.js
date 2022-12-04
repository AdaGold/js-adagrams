let letterDist = {
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

//* create score dictionary
let letterScore = {};
//* create score dictionary
const buildScore = (letters, score) => {
  for (const letter of letters) {
    letterScore[letter] = score;
  }
};
//* create score dictionary
buildScore(["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"], 1);
buildScore(["D", "G"], 2);
buildScore(["B", "C", "M", "P"], 3);
buildScore(["F", "H", "V", "W", "Y"], 4);
buildScore(["K"], 5);
buildScore(["J", "X"], 8);
buildScore(["Q", "Z"], 10);

//calculate total numbers of letters in pool
let totalLetters = 0;
for (const value of Object.values(letterDist)) {
  totalLetters += value;
}
//create letter pool from letter distribution
let letterPool = [];
for (const letter of Object.keys(letterDist)) {
  for (let i in letterDist) {
    letterPool.push(letter);
  }
}

export const drawLetters = () => {
  let hand = [];
  for (let i = 1; (i = 10); i++) {
    let drawnLetter = Math.random() * totalLetters;
    delete letterPool[drawnLetter];
    hand.push(letterPool[drawnLetter]);
  }
};

export const usesAvailableLetters = (input, lettersInHand) => {
  for (let letter of input) {
    if (lettersInHand.includes(letter)) {
      i = lettersInHand.indexOf(letter);
      fruits.splice(i, 1);
    } else {
      return false;
    }
    return true;
  }
};

export const scoreWord = (word) => {
  score = 0;
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
