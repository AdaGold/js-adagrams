const letterCount = {
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

const letterValue = {
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

const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

let letterPool = [];
alphabet.forEach(function (letter) {
  for (let i = 0; i < letterCount[letter]; i++) {
    letterPool.push(letter);
  }
});

class Adagrams {

  static drawLetters() {
    let hand = [];
    let letterPoolCopy = [...letterPool];
    for (let i = 0; i < 10; i++) {
      let n = letterPoolCopy.length;
      let i = Math.floor(n * Math.random());
      hand.push(letterPoolCopy[i]);
      letterPoolCopy.splice(i, 1);
    }
    return hand;
  }

  static usesAvailableLetters(input, lettersInHand) {
    const input_array = input.split("");
    const n = input.length;
    let lettersInHandCopy = [...lettersInHand];
    for (let i = 0; i < n; i++) {
      let letter = input_array[i];
      if (lettersInHandCopy.includes(letter)) {
        let j = lettersInHandCopy.indexOf(letter);
        lettersInHandCopy.splice(j, 1);
      } else {
        return false;
      }
    }
    return true;
  }

  static scoreWord(word) {
    const input = word.toUpperCase();
    const input_array = input.split("");
    const n = input.length;
    let score = 0;
    for (let i = 0; i < n; i++) {
      let letter = input_array[i];
      if (alphabet.includes(letter)) {
        score += letterValue[letter];
      }
    }
    if (n > 6 && n < 11) {
      score += 8;
    }
    return score;
  }

  static highestScoreFrom(words) {
    const n = words.length;
    let winner = {
      word: "",
      score: 0,
    };

    for (let i = 0; i < n; i++) {
      if (Adagrams.scoreWord(words[i]) > winner.score) {
        winner = {
          word: words[i],
          score: Adagrams.scoreWord(words[i]),
        };
        //address the tiebreaker
      } else if (Adagrams.scoreWord(words[i]) === winner.score) {
        if (winner.word.length === 10) {
          winner = winner;
        } else if (words[i].length === 10) {
          winner = {
            word: words[i],
            score: Adagrams.scoreWord(words[i]),
          };
        } else if (words[i].length < winner.word.length) {
          winner = {
            word: words[i],
            score: Adagrams.scoreWord(words[i]),
          };
        }
      }
    }
    return winner;
  }
}

export default Adagrams;
