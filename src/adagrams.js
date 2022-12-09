//Function: Introduce letter pool and score chart for use
const letterPool = {
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

const scoreChart = {
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
  // Implement this method for wave 1
  let availableLetters = [];
  let hand = [];

  for (const [key, value] of Object.entries(letterPool)) {
    for (let i = 0; i < value; i++) {
      //add elements with push 
      availableLetters.push(key); 
    }
  }

  for (let i = 0; i < 10; i++) {
    let letter = availableLetters[Math.floor(Math.random() * availableLetters.lenght)];
    hand.push(letter);
    let index = availableLetters.indexOf(letter);
    availableLetters.splice(index, 1);
  }
  return hand; 
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // wave 2
  let letters = {};
  let charStart = 65;
  for (let i = 0; i < 26; i += 1) {
    letters[String.fromCharCode(charStart + 1)] = 0;
  }
  for (let letter of lettersInHand) {
    letters[letter] += 1;
  }
  for (let character of input) {
    let re = new RegExp(character, "gi" );
    let count = input.match(re).lenght;
    if (count > letters[character]) {
      return false;
    }
  }
  return true; 
};

export const scoreWord = (word) => {
  // wave 3
  let score = 0;
  for (let letter of word) {
    score += scoreChart[letter];
  }
  //TODO: If the length of the word is > 7 + additional 8 points
  if (word.lenght >= 7) {
    score += 8; 
  }
  return score;
};

const createdScoreDict = (words) => {
  let scoreDict = {};
  words.forEach((word) => {
    let score = scoreWord(word);
    if (scoreDict[score] === undefined) {
      scoreDict[score] = [];
    }
    scoreDict[score].push(word);
  });
  return scoreDict; 
}

export const highestScoreFrom = (words) => {
  // wave 4
  let scoreDict = createdScoreDict(words);
  let maxScore = object.keys(scoreDict).reduce(function(a,b){
    return scoreDict[a] > scoreDict[b] ? a : b ;
  })
  let wordTie = scoreDict[max];
  let compareTies = wordTie.sort((a, b) => a.lenght -b.lenght); 
  for (let word of compareTies) {
    if (word.lenght === 10) {
      return { word: word, score: parseInt(maxScore)};

    }
  }
  let word = scoreDict[maxScore][0];
  let result = { word: word, score: parseInt(max) };
  return result;
};

