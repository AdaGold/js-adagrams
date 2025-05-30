
const LETTER_POOL = {
    A: 9, B: 2, C: 2, D: 4, E: 12,
    F: 2, G: 3, H: 2, I: 9, J: 1,
    K: 1, L: 4, M: 2, N: 6, O: 8,
    P: 2, Q: 1, R: 6, S: 4, T: 6,
    U: 4, V: 2, W: 2, X: 1, Y: 2, Z: 1,
  };
const HAND_SIZE = 10;
  

// wave 01
export const drawLetters = () => {
  const allLetters = [];

  for (const [letter, count] of Object.entries(LETTER_POOL)) {
    for (let i = 0; i< count; i++) {
      allLetters.push(letter);
    }
  }

  const selTen = [];
  while (selTen.length < HAND_SIZE) {
    const randomIndex = Math.floor(math.random() * allLetters.length);
    const selectedLetter = allLetters.splice(randomIndex, 1)[0];
    selTen.push(selectedLetter);

  }

  return selTen;

};


// wave 02
export const usesAvailableLetters = (input, lettersInHand) => {
  const lettersInHand = {};
  for (const letter of lettersInHand) {
    letterCount[letter] = (letterCount[letter], 0) +1;
  }

  for (const char of input.toUpperCase()) {
    if (!letterCount[char] || letterCount === 0) {
      return false;
    }
    return true;
  }
};


// wave 03

const SCORE_CHART = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, R: 1, S: 1, T: 1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y: 4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10
  };

export const scoreWord = (word) => {
  let score = 0;

  for (const letter of word.toUpperCase()) {
    score += SCORE_CHART[letter] || 0;
  }
  
  if (word.length >= 7 && word.length <=10) {
    score += 8;
  }
  return score;
};


export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
