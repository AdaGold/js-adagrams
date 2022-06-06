const { useReducer } = require('react');
const Actions = require('./action-types');
const { errorInterceptor } = require('./errors');
const { ScreenId } = require('./screens.js');

const initialState = {
  currentScreen: ScreenId.MAIN_MENU,
  gameTimer: 15, // seconds
  desiredPlayers: 2,
  roundsPerGame: 3,
  currentPlayer: null, // No players initially.
  players: {}, // No players known initially.
  lastError: "", // The error set by the last action
};

function gameStateReducer(state, action) {
  switch (action.type) {
    case Actions.SWITCH_SCREEN:
      return {
        ...state,
        currentScreen: action.payload
      };
    default:
      return { ...state };
  }
}

const reducer = errorInterceptor(gameStateReducer);

function useGameReducer() {
  return useReducer(reducer, initialState);
}

module.exports = {
  useGameReducer,
  reducer,
  initialState
};
