import { useReducer } from 'react';

import * as Actions from './action-types';
import { errorMiddleware } from './errors';
import { validateOptionsInput } from './options';
import { validateGuessInput } from './rules';
import { ScreenId } from './screens';
import { timerMiddleware } from './timer';

import Adagrams from 'demo/adagrams';

const GO_STRAIGHT_TO_GAME = false;

const initialState_real = {
  currentScreen: ScreenId.MAIN_MENU,
  lastError: "", // The error set by the last action
  // in-game props
  gameTimer: 15, // seconds
  currentHand: Adagrams.drawLetters(),
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
  gameTimer: 5, // seconds
  currentHand: Adagrams.drawLetters(),
  currentRound: 0, // Starts on first round
  currentPlayer: 0, // First player starts as current.
  // settings
  secondsPerTurn: 5, // Invalid value to set, but I can still set it by default. You can't cage me!
  desiredPlayers: 4,
  roundsPerGame: 2,
  players: [
    { name: 'First Player', words: [[]]},
    { name: 'Second Player', words: [[]]},
    { name: 'Third Player', words: [[]]},
    { name: 'Fourth Player', words: [[]]}
  ],
};

export const initialState = GO_STRAIGHT_TO_GAME ? initialState_straighttoGame : initialState_real;

function gameStateReducer(state, action) {
  switch (action.type) {
    case Actions.SWITCH_SCREEN:
      return { ...state, currentScreen: action.payload };
    case Actions.SET_NUMBER_ROUNDS:
      return { ...state, roundsPerGame: action.payload };
    case Actions.SET_DESIRED_PLAYERS:
      return { ...state, desiredPlayers: action.payload };
    case Actions.SET_TURN_SECONDS:
      return { ...state, secondsPerTurn: action.payload, gameTimer: action.payload };
    case Actions.ADD_PLAYER:
      const newPlayer = {
        name: action.payload,
        words: [[]] // a list of word for each round, starting with an empty round 1 list
      };
      return { ...state, players: [ ...state.players, newPlayer ] };
    case Actions.GUESS:
      return guessWord(state, action.payload);
    case Actions.ADVANCE_TURN:
      return advanceTurn(state);
    case Actions.REMATCH:
      return {
        ...state,
        currentScreen: ScreenId.GAME,
        currentHand: Adagrams.drawLetters(),
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
      return {
        ...state,
        currentPlayer: 0,
        currentRound: nextRound,
        currentHand: Adagrams.drawLetters(),
        // Add another round of words to each player.
        players: state.players.map(p => ({
          name: p.name,
          words: [...p.words, []]
        }))
      }
    }
  }

  return {
    ...state,
    currentPlayer: nextPlayer
  }
}

function guessWord(state, word) {
  // Add the word to the current player's current round list.
  return {
    ...state,
    players: state.players.map((p, pIdx) => ({
      name: p.name,
      words: p.words.map((wordsForRound, wIdx) => {
        if (wIdx === state.currentRound && pIdx === state.currentPlayer) {
          return [...wordsForRound, word];
        }
        return wordsForRound;
      })
    }))
  };
}

export const reducer =
  timerMiddleware(
    validateGuessInput(
      validateOptionsInput(
        errorMiddleware(
          gameStateReducer
        )
      )
    )
  );

export function useGameReducer() {
  return useReducer(reducer, initialState);
}
