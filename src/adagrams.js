const LETTER_POOL = {
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
let letterList = [];
for (let letter in LETTER_POOL) {
  // console.log(`letter ${LETTER_POOL[letter]}`)
 letterList += letter.repeat(LETTER_POOL[letter])
}
console.log(letterList)

  
let randomIndex = (letterList) => {
        let index = Math.floor(Math.random() * letterList.length);
        return letterList[index];
    };


export const drawLetters = () => {
  // Implement this method for wave 1
  let selectedLetters = [];

  

  while (selectedLetters.length < 10) {

    

    let chosenLetter = randomIndex(letterList);
      if (selectedLetters.reduce((count, letter) => count + (letter === chosenLetter ? 1 : 0), 0) < LETTER_POOL[chosenLetter]){
        selectedLetters.push(chosenLetter);}
      // console.log(selectedLetters);}
      else {
        continue;
      }
  
    }
  return selectedLetters;

};


console.log(drawLetters())

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
       
    let clone =  {...lettersInHand}

    for (let character  of input.toUpperCase()){
    if (character in clone){
      clone.pop(character);
    }
  
    else {
      return false;
    }
  }
  return true;

    
};

export const scoreWord = (word) => {
    let wordScore = 0;
    const scores = {"A" : 1, "E": 1, "I": 1, "O": 1, "U": 1 ,"L": 1, "N": 1, "R": 1, "S": 1, "T": 1, "D": 2, "G": 2,"B": 3, "C": 3, "M": 3, "P": 3, "F": 4, "H": 4, "V": 4, "W": 4, "Y": 4,"K": 5, "J": 8, "X":8 ,"Q": 10, "Z": 10};

    if (word === ""){
      return wordScore;
    }
    
    if (word.length < 1){
      // wordScore = 0
      return wordScore;
    }

    for (let letter of word.toUpperCase()){
        wordScore += scores[letter]
        console.log(`score:${scores[letter]}`)}
    if (word.length >= 7){
        wordScore += 8}


    return wordScore;
  
};

// console.log(scoreWord("word"))

// export const highestScoreFrom = (words) => {
//   let winningWord = '';
   
//   let highestScore = 0; 
//   for (let word of words){ 
//       let wordScore = scoreWord(word);

//       if (wordScore > highestScore){ 
//         highestScore = wordScore;
//         winningWord = word;
//       } else if (wordScore === highestScore);{
//           if (winningWord.length === 10)
//               continue;
//           else if (word.length < winningWord.length && winningWord.length != 10);{
//               winningWord = word;
//           }
//           // else if (word.length == 10 && winningWord.length != 10)
//           //     winning_word = word;
//           //   }
          
      
      
//           //   };
    
//   return [winning_word, highest_score];
// };
