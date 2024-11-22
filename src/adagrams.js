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
  const scoreChart = {
    'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1, 'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1, 'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10
  };

  const bonusPoints = 8;
  let points = 0;
  let nonAlphaChars = 0;

  if (!word) {
    return points;
  };

  for (let char of word.toUpperCase()) {
    if (scoreChart[char]) {
      points += scoreChart[char];
    } else {
      nonAlphaChars += 1;
    }
  };

  if ((word.length - nonAlphaChars) >= 7 && (word.length - nonAlphaChars) <= 10) {
    points += bonusPoints;
  } 
  return points;
};

export const highestScoreFrom = (words) => {
  let highestScoringWord = words[0];
  let highestScore = scoreWord(words[0]);

  for (let i = 1; i < words.length; i++) {
    let word = words[i]
    let currentScore = scoreWord(word);

    if (currentScore > highestScore) {
      highestScore = currentScore;
      highestScoringWord = word;
    } else if (currentScore === highestScore) {
      if (highestScoringWord.length === 10) {
        continue;
      } else if (word.length == 10 || word.length < highestScoringWord.length) {
        highestScoringWord = word;
      }
    }
  }
  return {
    word: highestScoringWord,
    score: highestScore,
  };
};
