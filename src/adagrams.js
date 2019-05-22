const Adagrams = {
  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
    // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },

  drawLetters() {
    const array = 'AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ'.split('');
    this.shuffle(array);
    return array.slice(0, 10);
  },

  usesAvailableLetters(input, lettersInHand) {
    const letters = input.split('');
    let result = true;

    letters.forEach((letter) => {
      if (lettersInHand.includes(letter)) {
        let i = 0
        lettersInHand.forEach((val) => {
          if (val == letter) {
            lettersInHand.splice(i, 1);
          } else {
            i += 1;
          }
        })
      } else {
        result = false;
      }
    })
    return result;
  },

  scoreWord(word) {
    const scores = {
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
      Z: 10
    };

    let sum = 0;

    word.split('').forEach((letter) => {
      sum += scores[letter.toUpperCase()];
    });

    if (word.length > 6) {
      sum += 8;
    }

    return sum;
  },

  highestScoreFrom(words) {
    let topWord = null;
    let topScore = null;

    words.forEach((word) => {
      const score = this.scoreWord(word);
      if (score > topScore) {
        topWord = word;
        topScore = score;
      } else if (score == topScore) {
        if (word.length == 10 && topWord.length != 10) {
          topWord = word;
          topScore = score;
        } else if (word.length < topWord.length && topWord.length != 10) {
          topWord = word;
          topScore = score;
        }
      }
    });

    return {word: topWord, score: topScore};
  }
};

// Do not remove this line or your tests will break!
export default Adagrams;
