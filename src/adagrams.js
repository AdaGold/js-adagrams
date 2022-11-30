const LETTERPOOL = {
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

const VALUEDICT = {
  A: 1,
  E: 1,
  I: 1,
  O: 1,
  U: 1,
  L: 1,
  N: 1,
  R: 1,
  S: 1,
  T: 1,
  D: 2,
  G: 2,
  B: 3,
  C: 3,
  M: 3,
  P: 3,
  F: 4,
  H: 4,
  V: 4,
  W: 4,
  Y: 4,
  K: 5,
  J: 8,
  X: 8,
  Q: 10,
  Z: 10,
};

export const drawLetters = () => {
  const letterList = buildLetterList();

  let count = 0;
  const drawnLetters = [];

  while (count < 10) {
    const index = Math.floor(Math.random() * letterList.length);
    drawnLetters.push(letterList[index]);
    letterList.splice(index, 1);
    count++;
  }

  return drawnLetters;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const letterDict = {};

  for (let letter of lettersInHand) {
    if (letter in letterDict) {
      letterDict[letter] += 1;
    } else {
      letterDict[letter] = 1;
    }
  }

  for (let letter of input) {
    letter = letter.toUpperCase();
    if (!(letter in letterDict) || letterDict[letter] == 0) {
      return false;
    } else {
      letterDict[letter] -= 1;
    }
  }

  return true;
};

export const scoreWord = (word) => {
  let sum = 0;

  for (let letter of word) {
    letter = letter.toUpperCase();
    sum += VALUEDICT[letter];
  }

  if (word.length >= 7 && word.length <= 10) {
    sum += 8;
  }

  return sum;
};

export const highestScoreFrom = (words) => {
  let highestScore = 0;
  const highestScoreWords = [];

  for (const word of words) {
    const score = scoreWord(word);
    if (score > highestScore) {
      highestScoreWords.length = 0;
      highestScoreWords.push(word);
      highestScore = score;
    } else if (score == highestScore) {
      highestScoreWords.push(word);
    }
  }

  let shortestWordLen = highestScoreWords[0].length;
  let shortestWord = highestScoreWords[0];

  for (let word of highestScoreWords) {
    if (word.length == 10) {
      return {word: word, score: scoreWord(word)};
    } else if (word.length < shortestWordLen) {
      shortestWordLen = word.length;
      shortestWord = word;
    }
  }

  return {word: shortestWord, score: scoreWord(shortestWord)};
};

/********* Helper Functions *********/
const buildLetterList = function() {
  const letterList = [];

  for (let letter in LETTERPOOL) {
    for (let i = 0; i < LETTERPOOL[letter]; i++) {
      letterList.push(letter);
    }
  }

  return letterList;
};