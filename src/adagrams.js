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
    const scoreChart = {
      'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1,
      'D': 2, 'G': 2,
      'B': 3, 'C': 3, 'M': 3, 'P': 3,
      'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
      'K': 5,
      'J': 8, 'X': 8,
      'Q': 10, 'Z': 10
    };
  
    if (word === ''){
      return 0;
    }
  
    let score = 0;
    const wordUpper = word.toUpperCase();
  
    for (let i = 0; i < wordUpper.length; i++) {
      const letter = wordUpper[i];
      score += scoreChart[letter] || 0;
    }
  
    if ([7, 8, 9, 10].includes(word.length)) {
      score += 8;
    }
  
    return score;
  };
  

  export const highestScoreFrom = (words) => {
    if (words.length === 0) {
      return null;
    }
  
    let highestScore = 0;
    let winningWord = null;
  
    for (const word of words) {
      const wordScore = scoreWord(word);
  
      if (wordScore > highestScore) {
        highestScore = wordScore;
        winningWord = word;
      } else if (wordScore === highestScore) {
        if (word.length === 10 && winningWord.length !== 10) {
          winningWord = word;
        } else if (word.length < winningWord.length && winningWord.length !== 10) {
          winningWord = word;
        }
      }
    }
  
    return { word: winningWord, score: highestScore };
  };
  


  /* The original Pseudocode for Wave 4
  PSEUDOCODE for WAVE 4:

FUNCTION get_highest_word_score(word_list):
highest_score = 0
winning_word = ""
FOR word IN word_list:
word_score = score_word(word)
IF word_score > highest_score:
highest_score = word_score
winning_word = word
ELSE IF word_score == highest_score:
IF LENGTH OF word == 10 AND LENGTH OF winning_word != 10:
winning_word = word
ELSE IF LENGTH OF word < LENGTH OF winning_word AND LENGTH OF winning_word != 10:
winning_word = word
RETURN A TUPLE CONTAINING winning_word AND highest_score

Roughly translated to JS:
  export const highestScoreFrom = (words) => {
    if words is empty:
        return null
    
    highestScore = 0
    winningWord = null

    for each word in words:
        wordScore = scoreWord(word)

        if wordScore > highestScore or (wordScore === highestScore and winningWord is null):
            highestScore = wordScore
            winningWord = word
        else if wordScore === highestScore:
            if word.length === 10 and winningWord.length !== 10:
                winningWord = word
            else if word.length < winningWord.length and winningWord.length !== 10:
                winningWord = word
    
    return { word: winningWord, score: highestScore }*/
