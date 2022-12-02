const LETTER_POOL = {
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
// ================ WAVE 1 ==================================
export const drawLetters = () => {
  //copy of LETTER_POOL so that original object doesn't change
  let letterPool = { ...LETTER_POOL };

  // looping through the letters/keys and then adding corresponding
  // #in value to array
  let availableLetters = [];
  for (let letter in letterPool) {
    for (let i = 0; i < letterPool[letter]; i++) {
      availableLetters.push(letter);
    }
  }

  // creating a hand with 10 random letters
  let handArray = [];
  while (handArray.length < 10) {
    // using a random number as a random index, and then tracking the randomNumber
    let randomNumber = Math.floor(Math.random() * availableLetters.length);
    let randomLetter = availableLetters[randomNumber];
    handArray.push(randomLetter);
    availableLetters.splice(randomNumber, 1); //removes letter so it can't be re-drawn
  }
  return handArray;
};

// ================ WAVE 2 ==================================
export const usesAvailableLetters = (input, lettersInHand) => {
  //copy of lettersInHand, for some reason ... didn't work
  let lettersInHandCopy = lettersInHand.slice();

  for (const letter of input.toUpperCase()) {
    if (!lettersInHandCopy.includes(letter)) return false;
    else if (lettersInHandCopy.includes(letter)) {
      lettersInHandCopy.splice(letter, 1);
    }
  }
  return true;
};
// ================ WAVE 3 ==================================
export const scoreWord = (word) => {
  // Implement this method for wave 3
};

// ================ WAVE 4 ==================================
export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
