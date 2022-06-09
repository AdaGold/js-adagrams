import Actions from './action-types';
import { SetErrorAction } from './errors';

export function validateOptionsInput(wrappedReducer) {
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
      case Actions.ADD_PLAYER: {
        const name = action.payload;
        if (state.players.find(p => p.name === name)) {
          return wrappedReducer(state, new SetErrorAction(
            `A player named ${name} already exists!`
          ))
        }
      }
    }

    return wrappedReducer(state, action);
  };
}
