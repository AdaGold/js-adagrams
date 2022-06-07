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
          const numPlayersError = new SetErrorAction(
            `${numPlayers} is not a valid number of players.`
          );
          return wrappedReducer(state, numPlayersError);
        }
      }
    }

    return wrappedReducer(state, action);
  };
}

module.exports = {
  validateOptionsInput
};
