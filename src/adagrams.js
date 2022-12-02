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

export const drawLetters = () => {
  // Implement this method for wave 1
  const hand = [];
  const letters = [];

  for (let [k, v] of Object.entries(letterPool)) {
    while (v > 0) {
      letters.push(k);
      v--;
    }
  }

  for (let i = 0; i < 10; i++) {
    let letter = "";
    let index = null;
    while (!letter) {
      index = Math.floor(Math.random() * 98);
      letter = letters[index];
    }
    hand.push(letter);
    letters[index] = "";
  }

  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
  const word = input.toUpperCase();
  const letterBankDict = {};

  for (const letter of lettersInHand) {
    if (letter in letterBankDict) {
      letterBankDict[letter.toUpperCase()] += 1;
    } else {
      letterBankDict[letter.toUpperCase()] = 1;
    }
  }

  for (const letter of word) {
    if (!(letter in letterBankDict)) {
      return false;
    } else if (letterBankDict[letter] === 0) {
      return false;
    } else {
      letterBankDict[letter] -= 1;
    }
  }

  return true;
};

export const scoreWord = (word) => {
  const lettersDict = {
    A: 1,
    B: 3,
    C: 3,
    D: 2,
    E: 1,
    F: 4,
    G: 2,
    H: 4,
    I: 1,
    J: 9,
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

  let sum = 0;

  for (const letter of word) {
    sum += lettersDict[letter.toUpperCase()];
  }

  if (word.length > 6) {
    sum += 8;
  }

  return sum;
};

export const highestScoreFrom = (words) => {
  const wordsDict = {};

  for (const word of words) {
    wordsDict[word] = scoreWord(word);
  }

  let winner = { word: words[0], score: wordsDict[words[0]] };

  for (let [k, v] of Object.entries(wordsDict)) {
    if (v > winner.score) {
      winner.word = k;
      winner.score = v;
    }
    if (v === winner.score && winner.word.length < 10) {
      if (k.length == 10) {
        winner.word = k;
        winner.score = v;
      } else if (k.length < winner.word.length) {
        winner.word = k;
        winner.score = v;
      }
    }
  }
  return winner;
};
