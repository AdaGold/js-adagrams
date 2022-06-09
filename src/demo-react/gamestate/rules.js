import * as Actions from './action-types';
import { SetErrorAction } from './errors';

import Adagrams from 'demo/adagrams';

export function validateGuessInput(wrappedReducer) {
  return (state, action) => {
    if (action.type === Actions.GUESS) {
      const word = action.payload.toUpperCase();

      if (wordHasBeenGuessed(state, word)) {
        const errAction = new SetErrorAction(`${word} was already guessed!`);
        return wrappedReducer(state, errAction);
      }

      if (!word) {
        return wrappedReducer(state, new SetErrorAction('Enter a word!'));
      }

      if (!Adagrams.usesAvailableLetters(word, state.currentHand)) {
        const errAction = new SetErrorAction(`${word} isn't valid!`);
        return wrappedReducer(state, errAction);
      }

      // Ensure that the word is uppercased
      return wrappedReducer(state, { ...action, payload: word });
    }

    return wrappedReducer(state, action);
  }
}

function wordHasBeenGuessed(state, word) {
  for (let p of state.players) {
    for (let w of p.words[state.currentRound]) {
      if (w === word) {
        return true;
      }
    }
  }
  return false;
}
