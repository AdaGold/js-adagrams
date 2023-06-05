const letterPool = {
A : 9,	
B : 2,	
C : 2,
D : 4,	
E : 12,	
F : 2,	
G : 3,	
H : 2,	
I : 9,	
J : 1,	
K : 1,	
L : 4,	
M : 2,
N : 6,
O : 8,
P : 2,
Q : 1,
R : 6,
S : 4,
T : 6,
U : 4,
V : 2,
W : 2,
X : 1,
Y : 2,
Z : 1
};

export function drawLetters() {
  
  let hand = [];
  
  // Create an array of all available letters in the pool called availableLetters that contains all the letters from the letterPool object. The reduce method is used to loop through the keys of the object and create an array with all the letters based on the count of each letter.
  let availableLetters = Object.keys(letterPool).reduce((arr, letter) => {
  // Initiate a for loop to iterate over the count of each letter in the letterPool object.
  for (let i = 0; i < letterPool[letter]; i++) {
  // Add the current letter to the availableLetters array.
  arr.push(letter);
  }
  // Return the updated array.
  return arr;
  // Specify an empty array as the initial value of the arr parameter for the reduce method.
  }, []);
  
  // Initializes a for loop that will execute 10 times to draw 10 random letters from the availableLetters array.
  for (let i = 0; i < 10; i++) {
  // Generate a random index within the range of the availableLetters array.
  let randomIndex = Math.floor(Math.random() * availableLetters.length);
  // Add the letter at the randomly generated index to the hand array.
  hand.push(availableLetters[randomIndex]);
  // Remove the letter at the randomly generated index from the availableLetters array to ensure that it's not drawn again.
  availableLetters.splice(randomIndex, 1);
  }
  
  return hand;
  }

export const usesAvailableLetters = (input, lettersInHand) => {
  // Make a copy of lettersInHand to avoid modifying original array
  let hand = lettersInHand.slice(); 
    // Loop iterates over every letter in input
    for (let i = 0; i < input.length; i++) {
  // See if current letter is in hand using indexOf() method, which returns the index of the first occurrence of the element in the array. If the element is not found, it returns -1.
  let index = hand.indexOf(input[i]); 
    if (index === -1) {
      // Letter not in hand
      return false; 
    } else {
      // Remove letter from hand
      hand.splice(index, 1);
  }
  }
  return true;
  };

export const scoreWord = (word) => {
  // Define the points for each letter
  const letterPoints = {
    A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5,
    L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4,
    W: 4, X: 8, Y: 4, Z: 10
  };

  // Calculate the total score for the word
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    const letter = word[i].toUpperCase();
    if (letterPoints[letter]) {
      score += letterPoints[letter];
    }
  }

  // Add 8 points if the word has 7, 8, 9, or 10 letters
  if (word.length >= 7 && word.length <= 10) {
    score += 8;
  }
  
  // Return the total score
  return score;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
