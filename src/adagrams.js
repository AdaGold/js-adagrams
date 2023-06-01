export const drawLetters = () => {
  const letterPool = {
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

  let hand = [];

  for (let i = 0; i < 10; i++) {
    let letter = Object.keys(letterPool)[Math.floor(Math.random() * 26)];
    if (letterPool[letter] > 0) {
      hand.push(letter);
      letterPool[letter] -= 1;
    } else {
      i -= 1;
    }
  }

  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {

    const letterBankLower = lettersInHand.map((letter) => letter.toLowerCase());
    const inputLower = input.toLowerCase();
  
    for (const letter of inputLower) {
      const index = letterBankLower.indexOf(letter);
      if (index !== -1) {
        letterBankLower.splice(index, 1);
      } else {
        return false;
      }
    }
    return true;
  };

  
export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
