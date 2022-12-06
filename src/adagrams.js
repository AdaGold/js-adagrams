const letterDist = {
  A: 9,
  B: 2,
  C: 2,
  D: 4,
  E: 12,
  F: 2,
  G: 3,
  H: 2,
  I: 9,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  O: 8,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  U: 4,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1,
};

export const drawLetters = () => {
  let letterPool = [];
  let hand = [];

  // create letter pool from letter distribution
  for (let letter in letterDist) {
    for (let i = 0; i < letterDist[letter]; i++) {
      letterPool.push(letter);
    }
  }

  // for (let i = 0; i < 10; i++) {
  while (hand.length < 10) {
    let randomIndex = parseInt(Math.random() * letterPool.length);
    let drawnLetter = letterPool[randomIndex];
    hand.push(drawnLetter);
    letterPool.splice(randomIndex, 1);
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
  }
  return true;
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
  word = word.toUpperCase();

  let points = 0;
  if (word.length === 0) {
    return points;
  } else if (word.length > 6) {
    points += 8;
  }
  for (let letter of word) {
    points += letterScore[letter];
  }
  return points;
};

export const highestScoreFrom = (words) => {
  let max = 0;
  let highestScoreWord = "";
  for (let word of words) {
    if (scoreWord(word) > max) {
      max = scoreWord(word);
      highestScoreWord = word;
    } else if (scoreWord(word) === max) {
      if (word.length != 10 && highestScoreWord.length != 10) {
        if (word.length < highestScoreWord.length) {
          highestScoreWord = word;
        }
      } else if (word.length === 10 && highestScoreWord.length != 10) {
        highestScoreWord = word;
      } else if (word.length != 10 && highestScoreWord.length === 10) {
        highestScoreWord = highestScoreWord;
      } else if (word.length === highestScoreWord) {
        highestScoreWord = highestScoreWord;
      }
    }
  }
  const output = {
    word: highestScoreWord,
    score: max,
  };
  return output;
};
