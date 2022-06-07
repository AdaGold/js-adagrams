const basicAction = require('./generic-action');
const Actions = require('./action-types');
const { SetErrorAction } = require('./errors');

function validateOptionsInput(wrappedReducer) {
  return (state, action) => {
    // If any of the payload input is invalid, throw the current action
    // away and instead send an error action.
    switch (action.type) {
      case Actions.SET_DESIRED_PLAYERS: {
        const numPlayers = action.payload;
        if (numPlayers < 1 || numPlayers > 4) {
          return wrappedReducer(state, new SetErrorAction(
            `${numPlayers} is not a valid number of players.`
          ));
        }
        break;
      }
      case Actions.SET_NUMBER_ROUNDS: {
        const numRounds = action.payload;
        if (numRounds < 1 || numRounds > 5) {
          return wrappedReducer(state, new SetErrorAction(
            `${numRounds} is not a valid number of rounds.`
          ));
        }
        break;
      }
      case Actions.SET_TURN_SECONDS: {
        const seconds = action.payload;
        if (seconds < 10 || seconds > 60) {
          return wrappedReducer(state, new SetErrorAction(
            `${seconds} is not a valid number of seconds for each player's turn.`
          ));
        }
        break;
      }
    }

    return wrappedReducer(state, action);
  };
}

module.exports = {
  validateOptionsInput
};
