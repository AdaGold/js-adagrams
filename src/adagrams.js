


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
const pointValues = {
  "A" : 1,
  "B" : 3,
  "C" : 3,
  "D" : 2,
  "E" : 1,
  "F" : 4,
  "G" : 2,
  "H" : 4,
  "I" : 1,
  "J" : 8,
  "K" : 5,
  "L" : 1,
  "M" : 3,
  "N" : 1,
  "O" : 1,
  "P" : 3,
  "Q" : 10,
  "R" : 1,
  "S" : 1,
  "T" : 1,
  "U" : 1,
  "V" : 4,
  "W" : 4,
  "X" : 8,
  "Y" : 4,
  "Z": 10,
};

export const drawLetters = () => {
  // Implement this method for wave 1
  let tiles = [];
  let letterPoolList = [];
  let letterFrequency = {};
  let count = 0;

  for (let letter of Object.keys(letterPool)){
    for (let i= 0; i <= letterPool[letter] - 1; i++){
      letterPoolList.push(letter);
    }
  }

  while (count <= 9){
    const random = () => {
      return letterPoolList[Math.floor(Math.random()* letterPoolList.length)];
    };

    let randomLetter = random();

    

    if (randomLetter in Object.keys(letterFrequency)){
      if ((letterFrequency[randomLetter] + 1) > letterPool[[randomLetter]]){
        randomLetter = random();
      } else {
        letterFrequency[randomLetter] ++;
      }
    } else {
      letterFrequency[randomLetter] = 1;
    }
    tiles.push(randomLetter);
    count++;
  }

  return tiles;
  

  
};



export const usesAvailableLetters = (input, lettersInHand) => {
  let lettersInHandFreq = {};
  let inputFreq = {};
  input.toUpperCase();

  for(let letter of lettersInHand){
    if(letter in lettersInHandFreq){
      lettersInHandFreq[letter] += 1
    } else {
      lettersInHandFreq[letter] = 1
    }
  }

  for(let char of input){
    if(char in lettersInHandFreq){
      if(char in inputFreq){
        inputFreq[char] += 1
      } else {
        inputFreq[char] = 1
      }
    } else {
      return false;
    }
  }

  for(let letter of Object.keys(inputFreq)){
    if(inputFreq[letter] > lettersInHandFreq[letter]){
      return false;
    } 
  }
  return true;

};

export const scoreWord = (word) => {
  let totalPoints = 0;


  if (word.length >= 7) {
    totalPoints += 8;
  }

  for(let index in word){
    let letterPointValue = pointValues[(word[index]).toUpperCase()]
    totalPoints += letterPointValue;
  }
  
  return totalPoints;
};

export const highestScoreFrom = (words) => {
  let wordPoints = {};
  let pointList = [];

  for(let word of words){
    let points = scoreWord(word)
    pointList.push(points)
    if(points in wordPoints){
      wordPoints[points].push(word)
    } else {
      wordPoints[points] = [word]
    }
  }

  let highestPoints = Math.max(...pointList);
  let highestScoredWords = wordPoints[highestPoints];

  let currentWinner = highestScoredWords[0]

  if(highestScoredWords.length === 1){
    return {'word' : currentWinner, 'score': highestPoints};
  }

  let range = highestScoredWords.length - 1;

  for(let i=1; i <= range; i++){
    if(currentWinner.length === 10){
      return {'word' : currentWinner, 'score': highestPoints};
    } else if((highestScoredWords[i]).length === 10){
      return {'word' : highestScoredWords[i], 'score': highestPoints};
    } else if(currentWinner.length > (highestScoredWords[i]).length){
      currentWinner = highestScoredWords[i]
    }
  
  }
  return {'word' : currentWinner, 'score': highestPoints}


};

