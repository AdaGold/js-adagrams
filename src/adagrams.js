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

const LETTER_POINTS = {
  A: 1,
  E: 1,
  I: 1,
  O: 1,
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
  Z: 10,
};

// ================ WAVE 1 ==================================
export const drawLetters = () => {
  //copy of LETTER_POOL so that original object doesn't change
  let letterPool = { ...LETTER_POOL };

  // looping through the letters/keys and then adding corresponding
  // #in value to array
  let availableLetters = [];
  for (let letter in letterPool) {
    for (let i = 0; i < letterPool[letter]; i++) {
      availableLetters.push(letter);
    }
  }

  // creating a hand with 10 random letters
  let handArray = [];
  while (handArray.length < 10) {
    // using a random number as a random index, and then tracking the randomNumber
    let randomNumber = Math.floor(Math.random() * availableLetters.length);
    let randomLetter = availableLetters[randomNumber];
    handArray.push(randomLetter);
    availableLetters.splice(randomNumber, 1); //removes letter so it can't be re-drawn
  }
  return handArray;
};

// ================ WAVE 2 ==================================
export const usesAvailableLetters = (input, lettersInHand) => {
  //copy of lettersInHand, for some reason ... didn't work
  let lettersInHandCopy = lettersInHand.slice();

  for (const letter of input.toUpperCase()) {
    if (!lettersInHandCopy.includes(letter)) return false;
    else if (lettersInHandCopy.includes(letter)) {
      lettersInHandCopy.splice(letter, 1);
    }
  }
  return true;
};

// ================ WAVE 3 ==================================
export const scoreWord = (word) => {
  let wordUpper = word.toUpperCase();
  let score = 0;
  for (let letter of wordUpper) {
    score += LETTER_POINTS[letter];
  }

  if (wordUpper.length >= 7 && wordUpper.length <= 10) {
    score += 8;
  }
  return score;
};

// ================ WAVE 4 ==================================
export const highestScoreFrom = (words) => {
  // declare variables to track the highest score and the word with the best score
  let highestScore = 0;
  let highestWord = "";
  //loop through each word in the array "words"
  for (let word of words) {
    //if a word score is equal to the highestScore, this code block will execute. If the current highestScore word has a length
    //of 10, then the code continues to the rest of the words in the array because it's prioritizing the length-10 word.
    //if there isn't already a highestScore word with a length of 10 and if the word being scored has a length of 10,
    //or if the word being scored is shorter than the current highestWord, prioritize that word
    if (scoreWord(word) === highestScore) {
      if (highestWord.length === 10) {
        continue;
      } else if (word.length === 10 || word.length < highestWord.length) {
        highestWord = word;
      }
    }
    // the first time the loop runs, it will jump down here because highestScore will be 0.
    //highestScore then becomes the first word. If the next word score is greater than the the first word score,
    //the code jumps down here and the next word becomes the new high score.
    else if (scoreWord(word) > highestScore) {
      highestScore = scoreWord(word);
      highestWord = word;
    }
  }

  let finalScore = { word: highestWord, score: highestScore };
  return finalScore;
};
