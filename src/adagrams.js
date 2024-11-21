export const drawLetters = () => {
  const alphabetMap = {
    'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2, 'I': 9, 'J': 1, 'K': 1, 'L': 4, 'M': 2, 'N': 6, 'O': 8, 'P': 2, 'Q': 1, 'R': 6, 'S': 4, 'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1
  };

  const letterPool = []
  for (const letter in alphabetMap) {
    for (let i = 0; i < alphabetMap[letter]; i++) {
      letterPool.push(letter);
    }
  };
  
  const drawnLetters = []
  while (drawnLetters.length < 10) {
    const randIndex = Math.floor(Math.random() * letterPool.length);
    drawnLetters.push(letterPool[randIndex]);
    letterPool.splice(randIndex, 1)
  };

  return drawnLetters;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const letterFrequency = {};
  for (const letter of lettersInHand) {
    letterFrequency[letter] = (letterFrequency[letter] || 0) + 1;
  };

  const upperWord = input.toUpperCase()

  for (let char of upperWord) {
    if (!(char in letterFrequency) || letterFrequency[char] === 0) {
      return false;
    }
    letterFrequency[char] -= 1;
  };
  return true;
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
