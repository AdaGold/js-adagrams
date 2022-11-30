export const drawLetters = () => {
  const letterBank = {
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
  function getRandomLetter(letterBank) {
    // get an array of letters by accessing the keys in the object
    const letters = Object.keys(letterBank);
    // Math.floor rounds down to the int and Math.random picks a random number in the range of 0 - 0.999
    // multiply the random number by the lenth of the letters array to return a random letter
    return letters[Math.floor(Math.random() * letters.length)];
  }

  const hand = [];
  while (hand.length < 10) {
    const randomLetter = getRandomLetter(letterBank);
    const occurance = hand.filter((x) => x === randomLetter).length;
    if (occurance < letterBank[randomLetter]) {
      hand.push(randomLetter);
    }
  }

  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
