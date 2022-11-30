import {LETTERPOOL, VALUEDICT} from "./constant.js";
import _ from "underscore";

export const drawLetters = () => {
  const letterList = buildLetterList();

  return _.sample(letterList, 10);
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const letterDict = {};

  for (let letter of lettersInHand) {
    if (letter in letterDict) {
      letterDict[letter] += 1;
    } else {
      letterDict[letter] = 1;
    }
  }

  for (let letter of input) {
    letter = letter.toUpperCase();
    if (!(letter in letterDict) || letterDict[letter] == 0) {
      return false;
    } else {
      letterDict[letter] -= 1;
    }
  }

  return true;
};

export const scoreWord = (word) => {
  let sum = 0;

  for (let letter of word) {
    letter = letter.toUpperCase();
    sum += VALUEDICT[letter];
  }

  if (word.length >= 7 && word.length <= 10) {
    sum += 8;
  }

  return sum;
};

export const highestScoreFrom = (words) => {
  let highestScore = 0;
  const highestScoreWords = [];

  for (const word of words) {
    const score = scoreWord(word);
    if (score > highestScore) {
      highestScoreWords.length = 0;
      highestScoreWords.push(word);
      highestScore = score;
    } else if (score == highestScore) {
      highestScoreWords.push(word);
    }
  }

  let shortestWordLen = highestScoreWords[0].length;
  let shortestWord = highestScoreWords[0];

  for (let word of highestScoreWords) {
    if (word.length == 10) {
      return {word: word, score: scoreWord(word)};
    } else if (word.length < shortestWordLen) {
      shortestWordLen = word.length;
      shortestWord = word;
    }
  }

  return {word: shortestWord, score: scoreWord(shortestWord)};
};

/********* Helper Functions *********/
const buildLetterList = function() {
  const letterList = [];

  for (let letter in LETTERPOOL) {
    for (let i = 0; i < LETTERPOOL[letter]; i++) {
      letterList.push(letter);
    }
  }

  return letterList;
};