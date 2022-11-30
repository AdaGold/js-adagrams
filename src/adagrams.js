const letterPool = {
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

const scoreChart = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const drawLetters = () => {
  let letterPoolDict = { ...letterPool };
  let lettersInHand = [];

  while (lettersInHand.length < 10) {
    let letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    if (letterPoolDict[letter] > 0) {
      letterPoolDict[letter] -= 1;
      lettersInHand.push(letter);
    }
  }
  return lettersInHand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  let drawnDict = {};

  for (let letter of lettersInHand) {
    if (letter in drawnDict) {
      drawnDict[letter] += 1;
    } else {
      drawnDict[letter] = 1;
    }
  }

  let word = [...input.toUpperCase()];

  for (let letter of word) {
    if (drawnDict[letter] == 0 || !drawnDict[letter]) {
      return false;
    } else {
      drawnDict[letter] -= 1;
    }
  }

  return true;
};

export const scoreWord = (word) => {
  const wordList = [...word.toUpperCase()];
  let score = 0;
  if (wordList.length >= 7) {
    score += 8;
  }

  wordList.forEach((letter) => (score += scoreChart[letter]));
  return score;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
