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

export const drawLetters = () => {
  //copy of LETTER_POOL so that original object doesn't change
  let letterPool = {
    ...LETTER_POOL,
  };
  console.log(letterPool)
  
  // looping through the letters/key and then adding corresponding
  // #in value to array
  let availableLetters = [];
  for (let letter in letterPool) {
    for (let i = 0; i < letterPool[letter]; i++) {
      availableLetters.push(letter);
    }
  }
  console.log(availableLetters)
  // creating a hand with 10 random letters
  let handArray = [];
  while (handArray.length < 10) {
    let randomNumber = Math.floor(Math.random() * availableLetters.length)
    let randomLetter = availableLetters[randomNumber];
    // if (availableLetters[hand] >= 1) {
    //   handArray.push(hand);
    //   availableLetters[hand] -= 1;
    // }
    console.log(`this is the random letter ${randomLetter}`)
    console.log(`this is the random number ${randomNumber}`)
    handArray.push(randomLetter);
    availableLetters.splice(randomNumber, 1)
  }
  console.log(handArray)
  return handArray
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
