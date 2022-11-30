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
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const drawLetters = () => {
  let letterPoolDict = {...letterPool};
  let hand = [];
  let i = 0;

  while (i < 10) {
    let letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    if (letterPoolDict[letter] > 0) {
      letterPoolDict[letter] -= 1;
      hand.push(letter);
      i++;
    }
  }
  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // handDict = {}
  // for letter_
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
