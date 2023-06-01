let LETTER_POOL = {
  'A': 9,
  'B': 2,
  'C': 2,
  'D': 4,
  'E': 12,
  'F': 2,
  'G': 3,
  'H': 2,
  'I': 9,
  'J': 1,
  'K': 1,
  'L': 4,
  'M': 2,
  'N': 6,
  'O': 8,
  'P': 2,
  'Q': 1,
  'R': 6,
  'S': 4,
  'T': 6,
  'U': 4,
  'V': 2,
  'W': 2,
  'X': 1,
  'Y': 2,
  'Z': 1
};

let SCORE_CHART = {
  'A': 1,
  'B': 3,
  'C': 3,
  'D': 2,
  'E': 1,
  'F': 4,
  'G': 2,
  'H': 4,
  'I': 1,
  'J': 8,
  'K': 5,
  'L': 1,
  'M': 3,
  'N': 1,
  'O': 1,
  'P': 3,
  'Q': 10,
  'R': 1,
  'S': 1,
  'T': 1,
  'U': 1,
  'V': 4,
  'W': 4,
  'X': 8,
  'Y': 4,
  'Z': 10
};

export const drawLetters = () => {
  let drawnLetters = [];
  let letterPoolCopy = { ...LETTER_POOL };
  let counter = 0;

  while (counter < 10) {
    let letters = Object.keys(letterPoolCopy);
    let randomIndex = Math.floor(Math.random() * letters.length);
    let letter = letters[randomIndex];

    if (letterPoolCopy[letter] === 0) {
      continue;
    } else {
      letterPoolCopy[letter]--;
      drawnLetters.push(letter);
      counter++;
    }
  }

  return drawnLetters;
};

export const usesAvailableLetters = (word, letterBank) => {
  let letterBankCopy = letterBank.map((letter) => letter.toUpperCase());

  let letterCount = {};

  for (let letter of letterBankCopy) {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }

  for (let letter of word.toUpperCase()) {
    if (!letterCount[letter]) {
      return false;
    }
    letterCount[letter]--;
  }

  return true;
};


export const scoreWord = (word) => {
  let totalScore = 0;

  for (let letter of word.toUpperCase()) {
    totalScore += SCORE_CHART[letter];
  }

  if (word.length > 6 && word.length <= 10) {
    totalScore += 8;
  }

  return totalScore;
};

export const highestScoreFrom = (wordList) => {
  let maxScore = 0;
  let maxWord = "";

  for (let word of wordList) {
    let currentScore = scoreWord(word);

    if (currentScore < maxScore) {
      continue;
    } else if (currentScore > maxScore) {
      maxScore = currentScore;
      maxWord = word;
    } else {
      if (word.length === maxWord.length) {
        continue;
      } else if (word.length === 10) {
        maxWord = word;
        maxScore = currentScore;
      } else if (word.length < maxWord.length && maxWord.length !== 10) {
        maxWord = word;
        maxScore = currentScore;
      } else {
        continue;
      }
    }
  }

  return { word: maxWord, score: maxScore };
};
