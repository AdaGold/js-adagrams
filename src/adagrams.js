export const drawLetters = () => {
  // implement this method for wave 1
  const LETTER_POOL = {
    A: 9, B: 2, C: 2, D: 4, E: 12, F: 2, G: 3, H: 2,
    I: 9, J: 1, K: 1, L: 4, M: 2, N: 6, O: 8, P: 2,
    Q: 1, R: 6, S: 4, T: 6, U: 4, V: 2, W: 2, X: 1,
    Y: 2, Z: 1
  };
  
  const MAX_HAND_COUNT = 10;
  let availableLetters = [];

  // create a list of available letters based on their respective frequencies
  for (let letter in LETTER_POOL) {
    let originalLetterCount = LETTER_POOL[letter];
    for (let i = 0; i < originalLetterCount; i++) {
      availableLetters.push(letter);
    }
  }

  let currentHand = [];

  // draw letters until we have 10 in the hand
  while (currentHand.length < MAX_HAND_COUNT) {
    const randomIndex = Math.floor(Math.random() * availableLetters.length);
    const letter = availableLetters[randomIndex];

    // add the letter to the hand and remove it from the available pool
    currentHand.push(letter);
    availableLetters.splice(randomIndex, 1);
  }

  return currentHand;
}

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
