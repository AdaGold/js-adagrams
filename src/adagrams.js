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
};


// Adagrams.highestScoreFrom(['BBBBBB', 'AAAAAAAAAA'])
// Do not remove this line or your tests will break!
export default Adagrams;
