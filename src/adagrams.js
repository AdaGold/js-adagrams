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




const letterScore = {
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
  


// If the length of the word is 7, 8, 9, or 10, 
// then the word gets an additional 8 points



// CONSIDER CHANGING DATA STRUCTURE TO REFLECT ## OF LETTERS (PROBABILITY!)
// for letterCopy 
export const drawLetters = () => {
  let letterBank = []
  let letterCopy = Object.assign({}, LETTER_POOL)
  let i = 0 
  let keys = Object.keys(letterCopy)
  // let prop = keys[Math.floor(Math.random() * keys.length)]
  while (i < 10) {
    let prop = keys[Math.floor(Math.random() * keys.length)]
    if (letterCopy[prop] > 0){
      letterBank[i] = prop;
      letterCopy[prop] -= 1;
    
      i ++;
      }
    }
    // console.log(letterBank);
    return letterBank;
};
  
// console.log(letterBank());
  

export const usesAvailableLetters = (input, lettersInHand) => {
  const handHash = {}; 
  let hashInput = {};
  let valid = [] 

  for (const letter of lettersInHand){handHash[letter] = handHash[letter] ? handHash[letter] + 1 : 1;
  };

  for (const letter of input){
    if (letter in handHash){
    hashInput[letter] = hashInput[letter]? hashInput[letter] + 1 : 1;
    }if (hashInput[letter] <= handHash[letter]){
      valid.push(letter)
      }
  };  
  if  (valid.length == input.length){
    return true;
  }else{
    return false;
  }

}; 

// letterScore
// Letter	Value
// [A, E, I, O, U, L, N, R, S, T]	1
// [D, G]	2
// [B, C, M, P]	3
// [F, H, V, W, Y]	4
// [K]	5
// [J, X]	8
// [Q, Z] 	10

// If the length of the word is 7, 8, 9, or 10, 
// then the word gets an additional 8 points

export const wordInfo = (word) => {
  let wordInfoDict = {}
  if (word.length == 0){
    return 0;
  }
  const input = word.toUpperCase()
  let wordHash = {};
  let counter = word.length > 6 ? 8 : 0;
                  
  for (const letter of input){

    wordHash[letter] = wordHash[letter]? (wordHash[letter] + letterScore[letter])  : letterScore[letter];
  }
  for (const key in wordHash) {
    counter += wordHash[key];
  }wordInfoDict['word'] = word;
  wordInfoDict['score'] = counter; 
  return wordInfoDict; 
 
};


export const scoreWord = (word) => {
  if (word.length == 0){
    return 0;
  }
  let results = wordInfo(word); 
  return results['score']; 
};
  // wordInfo(word); 

//   if (word.length == 0){
//     return 0;
//   }
//   const input = word.toUpperCase()
//   let wordHash = {};
//   let counter = word.length > 6 ? 8 : 0;
                  
//   for (const letter of input){

//     wordHash[letter] = wordHash[letter]? (wordHash[letter] + letterScore[letter])  : letterScore[letter];
//   }
//   for (const key in wordHash) {
//     counter += wordHash[key];
//   }
//   return counter; 

// };

// it("returns a hash that contains the word and score of best word in an array", () => {
//   const words = ["X", "XX", "XXX", "XXXX"];


export const highestScoreFrom = (words) => {
  let winningScore = {}
  let allInfo = []
  let scores = []
  let allBest = [] 
  for (const word of words){
    if(word.length == 10){
      return wordInfo(word);
    }
      let amnt = scoreWord(word);
      scores.push(amnt)
    }
  const winner = Math.max(...scores);
  const word_sort = words.sort((a,b) => a.length - b.length);
  
  for (const word of word_sort){
    let word_dict = wordInfo(word); 
    if (word_dict.score == winner){
      allBest.push(word_dict)};
  }
  // if (allBest.length > 1) { 
  //   allBest.sort((a,b) => a.length - b.length);
  // }
  // let min = Math.min(...allBest.map(({ length }) => length));
  // let shortest_word = Math.min(...allBest)
  // console.log(allBest[0]);
  // console.log('ONE WORD'); 
  return allBest[0]; 
  

  
};
    
// export const highestScoreFrom = (words) => {
//     let winningScore = {}
//     let allInfo = []
//     let scores = []
//     for (const word of words){
//       if(word.length == 10){
//         return wordInfo(word);
//       }
//       allInfo.push(wordInfo(word)); 
//       let amnt = scoreWord(word);
//       scores.push(amnt)
//       }const winner = Math.max(...scores);
//       const index = scores.indexOf(winner);
//      for (const word of words)
//       console.log(words[index], winner);
//       let winning_word = words[index];
   
//       winningScore['word'] = winning_word; 
//       winningScore['score'] = winner; 
//       console.log(winningScore);
//       if (winningScore.length > 1){
//         return winningScore[0];
//       }
//       return winningScore;

//     };


// export const highestScoreFrom = (words) => {
//   let winningScore = {}
//   let scores = []
//   for (const word of words){
//     let amnt = scoreWord(word);
//     scores.push(amnt)
//     }const winner = Math.max(...scores);
//     const index = scores.indexOf(winner);
//     console.log(words[index], winner);
//     let winning_word = words[index];
  
//     winningScore['word'] = winning_word; 
//     winningScore['score'] = winner; 
//     return winningScore;

//   };
