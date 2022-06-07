const { useReducer } = require('react');
const Actions = require('./action-types');
const { errorMiddleware } = require('./errors');
const { validateOptionsInput } = require('./options');
const { ScreenId } = require('./screens.js');

const initialState = {
  currentScreen: ScreenId.MAIN_MENU,
  gameTimer: 15, // seconds
  secondsPerTurn: 15,
  desiredPlayers: 2,
  roundsPerGame: 3,
  currentPlayer: null, // No players initially.
  players: [], // No players known initially.
  lastError: "", // The error set by the last action
};

function gameStateReducer(state, action) {
  switch (action.type) {
    case Actions.SWITCH_SCREEN:
      return { ...state, currentScreen: action.payload };
    case Actions.SET_NUMBER_ROUNDS:
      return { ...state, roundsPerGame: action.payload };
    case Actions.SET_DESIRED_PLAYERS:
      return { ...state, desiredPlayers: action.payload };
    case Actions.SET_TURN_SECONDS:
      return { ...state, secondsPerTurn: action.payload };
    case Actions.ADD_PLAYER:
      const newPlayer = {
        name: action.payload,
        words: [[]] // a list of word for each round, starting with an empty round 1 list
      };
      return { ...state, players: [ ...state.players, newPlayer ] }
    default:
      return { ...state };
  }
}

const reducer = validateOptionsInput(errorMiddleware(gameStateReducer));

function useGameReducer() {
  return useReducer(reducer, initialState);
}

module.exports = {
  useGameReducer,
  reducer,
  initialState
};
