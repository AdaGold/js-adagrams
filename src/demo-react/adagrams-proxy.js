import {
  drawLetters,
  usesAvailableLetters,
  scoreWord,
  highestScoreFrom,
} from "adagrams";

const Real = {
  drawLetters,
  usesAvailableLetters,
  scoreWord,
  highestScoreFrom,
};

const Proxy = {
  drawLetters() {
    const real = Real.drawLetters();
    if (typeof real === 'undefined') {
      return ["H", "E", "L", "L", "O", "W", "O", "R", "L", "D"];
    }

    return real;
  },

  usesAvailableLetters(input, lettersInHand) {
    const real = Real.usesAvailableLetters(input, lettersInHand);
    if (typeof real === 'undefined') {
      return true;
    }

    return real;
  },

  scoreWord(word) {
    const real = Real.scoreWord(word);
    if (typeof real === 'undefined') {
      return 1;
    }

    return real;
  },

  highestScoreFrom(words) {
    const real = Real.highestScoreFrom(words);
    if (typeof real === 'undefined') {
      if (words.length < 1) {
        return {};
      }

      return {
        word: words[0],
        score: Proxy.scoreWord(words[0]),
      };
    }

    return real;
  },
};

export default Proxy;
