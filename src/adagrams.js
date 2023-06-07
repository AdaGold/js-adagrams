// WAVE 1
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
  
  let letters = [];
  for (let letter in letterPool) {
    for (let i = 0; i < letterPool[letter]; i++) {
      letters.push(letter);
    }
  }

  let hand = [];
  for (let i = 0; i < 10; i++) {
    let randomIndex = Math.floor(Math.random() * letters.length);
    hand.push(letters[randomIndex]);
    letters.splice(randomIndex, 1);
  }

  return hand;
};

// WAVE 2
export const usesAvailableLetters = (input, lettersInHand) => {
  let lettersInHandCopy = [...lettersInHand];
  for (let letter of input) {
    if (!lettersInHandCopy.includes(letter)) {
      return false;
    } else {
      let index = lettersInHandCopy.indexOf(letter);
      lettersInHandCopy.splice(index, 1);
    }
  }

  return true; // If all letters in input are in the hand, return true
};

// WAVE 3
export const scoreWord = (word) => {
  if (word.length === 0) {
    return 0;
  }

  const letterScores = {
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
    Z: 10
  };

  let score = 0;

  for (let letter of word.toUpperCase()) {
    score += letterScores[letter];
  }

  if (word.length >= 7) {
    score += 8;
  }

  return score;
};


// WAVE 4
export const highestScoreFrom = (words) => {
  let highestScoringWord = '';
  let highestScore = 0;

  for (let word of words) {
    let score = scoreWord(word);

    if (score > highestScore) {
      highestScore = score;
      highestScoringWord = word;
    } else if (score === highestScore) {
      if (word.length === 10 && highestScoringWord.length !== 10) {
        highestScoringWord = word;
      } else if (word.length < highestScoringWord.length && highestScoringWord.length !== 10) {
        highestScoringWord = word;
      }
    }
  }

  return {
    word: highestScoringWord,
    score: highestScore
  };
};