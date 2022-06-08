const { useReducer } = require('react');
const Actions = require('./action-types');
const { errorMiddleware } = require('./errors');
const { timerMiddleware } = require('./timer');
const { validateOptionsInput } = require('./options');
const { ScreenId } = require('./screens.js');

const GO_STRAIGHT_TO_GAME = true;

const initialState_real = {
  currentScreen: ScreenId.MAIN_MENU,
  lastError: "", // The error set by the last action
  // in-game props
  gameTimer: 15, // seconds
  currentHand: [], // A result of adagrams.drawLetters()
  currentRound: 0, // Starts on first round
  currentPlayer: 0, // First player starts as current.
  // settings
  secondsPerTurn: 15,
  desiredPlayers: 2,
  roundsPerGame: 3,
  players: [], // No players known initially.
};

// For debugging, this goes straight to the game screen:
const initialState_straighttoGame = {
  currentScreen: ScreenId.GAME,
  lastError: "", // The error set by the last action
  // in-game props
  gameTimer: 1, // seconds
  currentHand: ['A', 'B', 'D'], // A result of adagrams.drawLetters()
  currentRound: 0, // Starts on first round
  currentPlayer: 0, // First player starts as current.
  // settings
  secondsPerTurn: 1, // Invalid value to set, but I can still set it by default. You can't cage me!
  desiredPlayers: 4,
  roundsPerGame: 1,
  players: [
    { name: 'First Player', words: [[]]},
    { name: 'Second Player', words: [[]]},
    { name: 'Third Player', words: [[]]},
    { name: 'Fourth Player', words: [[]]}
  ],
};

const initialState = GO_STRAIGHT_TO_GAME ? initialState_straighttoGame : initialState_real;

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
      return { ...state, players: [ ...state.players, newPlayer ] };
    case Actions.ADVANCE_TURN:
      return advanceTurn(state);
    case Actions.REMATCH:
      return {
        ...state,
        currentScreen: ScreenId.GAME,
        currentHand: ['A'], // TODO: read a new hand here!
        currentRound: 0,
        currentPlayer: 0,
        players: state.players.map(existingPlayer => ({
          ...existingPlayer,
          words: [[]]
        }))
      };
    case Actions.RESET:
      return {
        ...initialState
      };
    default:
      return { ...state };
  }
}

function advanceTurn(state) {
  const { players, currentPlayer, currentRound } = state;
  if (players.length === 0) {
    return state;
  }

  const nextPlayer = (currentPlayer + 1) % players.length;
  const nextRound = currentRound + 1;

  // If nextPlayer is the first player...
  //   and this is the last round, go to the win screen.
  //   Otherwise advance the round.
  // and if nextPlayer isn't the first player, just advance player.
  if (nextPlayer === 0) {
    if (nextRound >= state.roundsPerGame) {
      return {
        ...state,
        currentScreen: ScreenId.WIN
      };
    } else {
      // TODO: Update hand here.
      return {
        ...state,
        currentPlayer: 0,
        currentRound: nextRound
      }
    }
  }

  return {
    ...state,
    currentPlayer: nextPlayer
  }
}

const reducer = timerMiddleware(validateOptionsInput(errorMiddleware(gameStateReducer)));

function useGameReducer() {
  return useReducer(reducer, initialState);
}

module.exports = {
  useGameReducer,
  reducer,
  initialState
};
