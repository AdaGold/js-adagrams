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
  let hand = [];

  //create letter pool from letter distribution
  for (let letter in letterDist) {
    for (let i = 0; i < letterDist[letter] + 1; i++) {
      letterPool.push(letter);
    }
  }

  for (let i = 0; i < 10; i++) {
    const randomIndex = parseInt(Math.random() * letterPool.length);
    const drawnLetter = letterPool[randomIndex];
    letterPool.splice(randomIndex, 1);
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
