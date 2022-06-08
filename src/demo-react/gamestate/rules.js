const Actions = require('./action-types');
const { SetErrorAction } = require('./errors');

function validateGuessInput(wrappedReducer) {
  return (state, action) => {
    if (action.type === Actions.GUESS) {
      const word = action.payload;
      if (wordHasBeenGuessed(state, word)) {
        const errAction = new SetErrorAction(`${word} was already guessed!`);
        return wrappedReducer(state, errAction);
      }
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

module.exports = {
  validateGuessInput
};
