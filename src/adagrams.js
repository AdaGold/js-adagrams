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
    let letter = availableLetters[Math.floor(Math.random() * availableLetters.length)];
    hand.push(letter);
    let index = availableLetters.indexOf(letter); 
    availableLetters.splice(index, 1);
  }
  return hand; 
};


export const usesAvailableLetters = (input, lettersInHand) => {
  // wave 2 
  // Has two parameters:
//   `input`, the first parameter, describes some input word, and is a string
//   - `lettersInHand`, the second parameter, describes an array of drawn letters in a hand. You can expect this to be an array of ten strings, with each string representing a letter
// - Returns either `true` or `false`
// - Returns `true` if every letter in the `input` word is available (in the right quantities) in the `lettersInHand`
// - Returns `false` if not; if there is a letter in `input` that is not present in the `lettersInHand` or has too much of compared to the `lettersInHand`

lettersInHand = [...lettersInHand];
for (const letter of input) {
    if(lettersInHand.includes(letter)) {
      let indexLettersInHand = lettersInHand.indexOf(letter);
      lettersInHand.splice(indexLettersInHand, 1);
    } else {
      return false;
    }
  }
  return true; 
// const countLettersInHand = (lettersInHand) =>{
//   //go through loop and account for each word in letter
//   for(let i = 0 ; i < lettersInHand.length; ++i) {
//       let wordCounter = 0;
//       if 
//   };
//   //use a counter to keep track of letter frequency 
// };
};




export const scoreWord = (word) => {
  // wave 3
  let score = 0;
  for (let letter of word) {
    score += scoreChart[letter.toUpperCase()];
  }
  //TODO: If the length of the word is > 7 + additional 8 points
  if (word.length >= 7) {
    score += 8; 
  }
  return score;
};

export const highestScoreFrom = (words) => {
  //wave 4
  let wordsAndScores = {};

  //loop
  for (const word of words) {
    const score = scoreWord(word);
    wordsAndScores[word] = score;
  };

  const winningWordAndScore = {
    word: Object.keys(wordsAndScores)[0],
    score: Object.values(wordsAndScores)[0]
  };

  for (const[key, value] of Object.entries(wordsAndScores)) {
    //create conditional
    if (value > winningWordAndScore['score']) {
      winningWordAndScore['word'] = key;
      winningWordAndScore ['score'] = value;
    };

    if (value === winningWordAndScore['score'] && winningWordAndScore['word'].length < 10) {
      if(key.length === 10) {
        winningWordAndScore['word'] = key;
        winningWordAndScore['score'] = value;
      } else if (key.length < winningWordAndScore['word'].length) {
        winningWordAndScore['word'] = key;
        winningWordAndScore['score'] = value;
      }
    }
  }
  return winningWordAndScore; 
};