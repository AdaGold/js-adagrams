export const drawLetters = () => {
  const LETTER_POOL = {
    A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2,
    I: 9, J: 1, K: 1, L: 4, M: 2, N: 6, O: 8, P: 2,
    Q: 1, R: 6, S: 4, T: 6, U: 4, V: 2, W: 2, X: 1,
    Y: 2, Z: 1
  };
  
  const MAX_HAND_COUNT = 10;
  let availableLetters = [];

  for (let letter in LETTER_POOL) {
    let originalLetterCount = LETTER_POOL[letter];
    for (let i = 0; i < originalLetterCount; i++) {
      availableLetters.push(letter);
    }
  }

  let currentHand = [];

  while (currentHand.length < MAX_HAND_COUNT) {
    const randomIndex = Math.floor(Math.random() * availableLetters.length);
    const letter = availableLetters[randomIndex];

    currentHand.push(letter);
    availableLetters.splice(randomIndex, 1);
  }

  return currentHand;
}

export const usesAvailableLetters = (input, lettersInHand) => {
  const word = input.toUpperCase();

  for (const inputLetter of word) {
    const letterFreqInLetterBank = lettersInHand.filter((letter) => letter === inputLetter).length;
    const letterFreqInWord = word.split('').filter((letter) => letter === inputLetter).length;

    if (letterFreqInWord > letterFreqInLetterBank) {
      return false;
    }
  }

  return true;
};

export const scoreWord = (word) => {
  const pointsDict = {
    A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4,
    I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3,
    Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8,
    Y: 4, Z: 10
  };

  const BONUS_POINTS = 8;

  if (!word || word.length === 0) {
    return 0;
  }

  let totalPoints = 0;
  const upperWord = word.toUpperCase();

  for (const letter of upperWord) {
    totalPoints += pointsDict[letter];
  }

  if (upperWord.length >= 7) {
    totalPoints += BONUS_POINTS;
  }

  return totalPoints;
};

export const highestScoreFrom = (words) => {
  let bestWord = '';
  let bestScore = 0;
  let bestWordLength = 0;

  for (const word of words) {
      const wordScore = scoreWord(word);
      const wordLength = word.length;

      if (wordScore > bestScore) {
          bestWord = word;
          bestScore = wordScore;
          bestWordLength = wordLength;

      } else if (wordScore === bestScore) {


          if (wordLength === 10 && bestWordLength !== 10) {
              bestWord = word;
              bestWordLength = wordLength;

          } else if (wordLength === 10 && bestWordLength === 10) {
              continue;

          } else if (wordLength < bestWordLength && bestWordLength !== 10) {
              bestWord = word;
              bestWordLength = wordLength;
          }
      }
  }

  return { word: bestWord, score: bestScore };
};
