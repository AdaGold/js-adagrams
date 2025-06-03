const HAND_SIZE = 10;

const LETTER_COUNT = {
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

const LETTER_VALUE = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};

export const drawLetters = () => {
  let totalTiles = 0;
  for (const count of Object.values(LETTER_COUNT)) {
    totalTiles += count;
  }

  const hand = [];
  const usedLetters = {};

  // Create a hand of 10 tiles
  for (let i = 0; i < HAND_SIZE; i++) {
    // Generate a random index between 0 and totalTiles - i
    // This ensures that we don't pick the same letter more than its available count
    const letterIndex = Math.floor(Math.random() * totalTiles - i);

    // Iterate through fixed size dictionary LETTER_COUNT
    // to find which letter corresponds to the random index
    let currentIndex = 0;
    for (const [letter, count] of Object.entries(LETTER_COUNT)) {
      // Skip to next letter if all letters of this type are already used
      const lettersInHand = usedLetters[letter] || 0;
      if (lettersInHand >= count) {
        continue; 
      }

      // Calculate the index range for this letter
      currentIndex += count - lettersInHand;

      // If the random index falls within this letter's range, add it to the hand
      if (letterIndex < currentIndex) {
        usedLetters[letter] = (usedLetters[letter] || 0) + 1;
        hand.push(letter);
        break;
      }
    }
  }

  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const handCounts = {};
  for (const letter of lettersInHand) {
    if (letter in handCounts) {
      handCounts[letter] += 1;
    } else {
      handCounts[letter] = 1;
    }
  }

  for (const letter of input.toUpperCase()) {
    if (letter in handCounts && handCounts[letter] > 0) {
        handCounts[letter] -= 1;
    } else { // Letter is not available in sufficient quantity
      return false; 
    }
  }

  // If we reach here, all letters in input are available in lettersInHand
  return true;
};

export const scoreWord = (word) => {
  let score = 0;
  for (const letter of word.toUpperCase()) {
    if (letter in LETTER_COUNT) {
      score += LETTER_VALUE[letter];
    }
  }

  if (word.length > 6 && word.length < 11) {
    score += 8;
  }

  return score;
};

export const highestScoreFrom = (words) => {
  let bestWord = words[0]
  let bestScore = scoreWord(words[0])

  for (const word of words) {
    const wordScore = scoreWord(word)

    if (wordScore > bestScore) {
      bestWord = word;
      bestScore = wordScore;

    // Address the tiebreaker
    } else if (wordScore === bestScore) {
      if (bestWord.length !== 10) {
        if (word.length == 10 || word.length < bestWord.length) {
          bestWord = word;
        }
      }
    }
  }
  return {word: bestWord, score: bestScore};
};
