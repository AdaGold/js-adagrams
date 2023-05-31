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
  // Implement this method for wave 2
};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
