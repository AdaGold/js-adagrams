import { initialState, reducer } from 'demo-react/gamestate/reducer';
import * as Actions from 'demo-react/gamestate/action-types';
import makeAction from 'demo-react/gamestate/generic-action';
import { ScreenId } from 'demo-react/gamestate/screens';

import Adagrams from 'demo-react/adagrams';

jest.mock('demo-react/adagrams', () => {
  return {
    drawLetters: jest.fn(() => ["H", "E", "L", "L", "O", "W", "O", "R", "L", "D"]),
    usesAvailableLetters: jest.fn(() => true),
    scoreWord: jest.fn(),
    highestScoreFrom: jest.fn(),
  };
});

// Some actions merely replace the value of a specific state key with the
// action payload. This is a generic function to test those states.
function assertSimpleActionUpdatesKey(actionType, keyName, value = 'any-value') {
  const action = makeAction(actionType, value);
  const expected = {
    ...initialState,
    [keyName]: value
  }

  const actual = reducer(initialState, action);

  expect(actual).toEqual(expected);
}

const mockPlayerList = [
  { name: 'Max', words: [['HELO', 'LOW'], ['WORLD']]},
  { name: 'Min Soo', words: [[], ['OLE']]},
  { name: 'Rupa', words: [['HELLO'], ['DROLL', 'ROLE']]},
  { name: 'Elliot', words: [['DROOL'], ['WHORL']]}
];

const inGameState = {
  currentScreen: ScreenId.GAME,
  lastError: "", // The error set by the last action
  // in-game props
  gameTimer: 5, // seconds
  currentHand: ["H", "E", "L", "O", "L", "W", "O", "R", "L", "D"],
  currentRound: 1, // We're on the second round
  currentPlayer: 3, // The last player is guessing.
  // settings
  secondsPerTurn: 60,
  desiredPlayers: mockPlayerList.length,
  roundsPerGame: 2,
  players: mockPlayerList
};


describe('Game state reducer', () => {
  describe('Simple actions', () => {
    test('Switch screen', () => {
      assertSimpleActionUpdatesKey(
        Actions.SWITCH_SCREEN, 'currentScreen');
    });

    test('Reset returns to the initial state', () => {
      const action = makeAction(Actions.RESET);
      const currentState = {
        ...initialState,
        currentScreen: ScreenId.WIN,
        currentRound: 3,
        currentPlayer: 3,
        players: mockPlayerList
      };

      const actual = reducer(currentState, action);

      expect(actual).toEqual(initialState);
    })
  });

  describe('Set number of rounds', () => {
    test('Set 1 round, succeeds', () => {
      assertSimpleActionUpdatesKey(
        Actions.SET_NUMBER_ROUNDS, 'roundsPerGame', 1);
    });

    test('Set 5 rounds, succeeds', () => {
      assertSimpleActionUpdatesKey(
        Actions.SET_NUMBER_ROUNDS, 'roundsPerGame', 5);
    });
    
    test('Set 0 rounds, sets error', () => {
      const action = makeAction(Actions.SET_NUMBER_ROUNDS, 0);
      const actual = reducer(initialState, action);
      expect(actual).toEqual({
        ...initialState,
        lastError: '0 is not a valid number of rounds.'
      });
    });

    test('Set 6 rounds, sets error', () => {
      const action = makeAction(Actions.SET_NUMBER_ROUNDS, 6);
      const actual = reducer(initialState, action);
      expect(actual).toEqual({
        ...initialState,
        lastError: '6 is not a valid number of rounds.'
      });
    });
  });

  describe('Set desired number of players', () => {
    test('Set desired number of players to 1, succeeds', () => {
      assertSimpleActionUpdatesKey(
        Actions.SET_DESIRED_PLAYERS, 'desiredPlayers', 1);
    });

    test('Set desired number of players to 4, succeeds', () => {
      assertSimpleActionUpdatesKey(
        Actions.SET_DESIRED_PLAYERS, 'desiredPlayers', 4);
    });

    test('Set desired number of players to 0, sets error', () => {
      const action = makeAction(Actions.SET_DESIRED_PLAYERS, 0);
      const actual = reducer(initialState, action);
      expect(actual).toEqual({
        ...initialState,
        lastError: '0 is not a valid number of players.'
      });
    });

    test('Set desired number of players to 5, sets error', () => {
      const action = makeAction(Actions.SET_DESIRED_PLAYERS, 5);
      const actual = reducer(initialState, action);
      expect(actual).toEqual({
        ...initialState,
        lastError: '5 is not a valid number of players.'
      });
    });
  });

  describe('Set number of seconds per turn', () => {
    test('Set 10 seconds per turn, succeeds', () => {
      const action = makeAction(Actions.SET_TURN_SECONDS, 10);
      const expected = {
        ...initialState,
        gameTimer: 10,
        secondsPerTurn: 10
      }

      const actual = reducer(initialState, action);

      expect(actual).toEqual(expected);
    });

    test('Set 60 seconds per turn, succeeds', () => {
      const action = makeAction(Actions.SET_TURN_SECONDS, 60);
      const expected = {
        ...initialState,
        gameTimer: 60,
        secondsPerTurn: 60
      }

      const actual = reducer(initialState, action);

      expect(actual).toEqual(expected);
    });

    test('Set 9 seconds per turn, sets error', () => {
      const action = makeAction(Actions.SET_TURN_SECONDS, 9);
      const expected = {
        ...initialState,
        lastError: "9 is not a valid number of seconds for each player's turn."
      }

      const actual = reducer(initialState, action);

      expect(actual).toEqual(expected);
    });

    test('Set 61 seconds per turn, sets error', () => {
      const action = makeAction(Actions.SET_TURN_SECONDS, 61);
      const expected = {
        ...initialState,
        lastError: "61 is not a valid number of seconds for each player's turn."
      }

      const actual = reducer(initialState, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('Add Player', () => {
    test('Add player adds the player and a guess list for the first round', () => {
      const expectedState = {
        ...initialState,
        players: [{ name: 'Player One', words: [[]] }]
      };
      const addPlayerOne = makeAction(Actions.ADD_PLAYER, 'Player One');

      const actual = reducer(initialState, addPlayerOne);

      expect(actual).toEqual(expectedState)
    });

    test('Add player with no name, sets error', () => {
      const expectedState = {
        ...initialState,
        lastError: 'Enter a name!'
      };
      const addPlayerOne = makeAction(Actions.ADD_PLAYER, '');

      const actual = reducer(initialState, addPlayerOne);

      expect(actual).toEqual(expectedState)
    });

    test('Add player with existing player\'s name, sets error', () => {
      const expectedState = {
        ...initialState,
        players: [{ name: 'Player One', words: [[]] }],
        lastError: 'A player named Player One already exists!'
      };
      const addPlayerOne = makeAction(Actions.ADD_PLAYER, 'Player One');

      let actual = reducer(initialState, addPlayerOne);
      actual = reducer(actual, addPlayerOne);

      expect(actual).toEqual(expectedState)
    });
  });

  describe('Error handling', () => {
    test('Set last error', () => {
      assertSimpleActionUpdatesKey(Actions.SET_ERROR, 'lastError');
    });

    test('Any action clears last error', () => {
      const currentState = { ...initialState, lastError: 'Some error' };
      const expected = { ...currentState, lastError: '' };
      const action = makeAction(
        'literally-anything-besides-set-error',
        'the-payload' 
      );

      const actual = reducer(currentState, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('Timer ticks', () => {
    test('Ticks at 2 or more, gameTimer decrements', () => {
      const tickAction = makeAction(Actions.TICK);

      const actual = reducer(inGameState, tickAction);

      expect(actual).toEqual({
        ...inGameState,
        gameTimer: 4
      });
    });

    test('Ticks at 1 or fewer, turn advances and gameTimer resets', () => {
      const beforeNextTurnState = {
        ...inGameState,
        currentPlayer: 0,
        gameTimer: 1
      };
      const tickAction = makeAction(Actions.TICK);

      const actual = reducer(beforeNextTurnState, tickAction);

      expect(actual).toEqual({
        ...inGameState,
        currentPlayer: 1,
        gameTimer: inGameState.secondsPerTurn
      });
    });

    test('Ticks at 1 or fewer, no players, only game timer resets', () => {
      const beforeNextTurnState = {
        ...inGameState,
        currentPlayer: 0,
        gameTimer: 1,
        players: []
      };
      const tickAction = makeAction(Actions.TICK);
      const expectedState = {
        ...beforeNextTurnState,
        gameTimer: inGameState.secondsPerTurn
      };

      const actual = reducer(beforeNextTurnState, tickAction);

      expect(actual).toEqual(expectedState);
    });

    test('Ticks at 1 or fewer, current player is last, round advances and gameTimer resets', () => {
      const beforeNextTurnState = {
        ...inGameState,
        currentPlayer: inGameState.players.length - 1,
        currentRound: 0,
        gameTimer: 1
      };
      const tickAction = makeAction(Actions.TICK);

      const actual = reducer(beforeNextTurnState, tickAction);

      // The reducer will automatically draw a new hand.
      // For testing, just make sure the round, player, and timer are what is
      // expected.)
      expect(actual).toMatchObject({
        currentPlayer: 0,
        currentRound: 1,
        gameTimer: inGameState.secondsPerTurn
      });

      // Also check that the hand is different. The test mock is distinct from
      // the stub, and it should be nearly impossible to randomly draw the
      // previous hand.
      expect(actual.currentHand).not.toEqual(beforeNextTurnState.currentHand);
    });

    test('Ticks at 1 or fewer, last round, last player, game moves to WIN screen', () => {
      const beforeNextTurnState = {
        ...inGameState,
        currentPlayer: 3,
        currentRound: inGameState.roundsPerGame,
        gameTimer: 1
      };
      const tickAction = makeAction(Actions.TICK);
      const expectedState = {
        ...beforeNextTurnState,
        currentScreen: ScreenId.WIN,
        gameTimer: 60
      };

      const actual = reducer(beforeNextTurnState, tickAction);

      expect(actual).toEqual(expectedState);
    });
  });

  describe('Word guessing', () => {
    const deepCopyPlayerList = () => {
      return mockPlayerList.map(player => ({ ...player, words: player.words.map(roundList => [ ...roundList ]) }));
    }

    test('Guessing a word guesses the word for the current player', () => {
      const guessWhole = makeAction(Actions.GUESS, 'WHOLE');
      const playerListCopy = deepCopyPlayerList();
      playerListCopy[inGameState.currentPlayer].words[inGameState.currentRound].push('WHOLE');
      const expectedState = { ...inGameState, players: playerListCopy };

      const actualState = reducer(inGameState, guessWhole);

      expect(actualState).toEqual(expectedState);
    });

    test('Guessing a lower-case word guesses the uppercase word', () => {
      const guessWhole = makeAction(Actions.GUESS, 'whole');
      const playerListCopy = deepCopyPlayerList();
      playerListCopy[inGameState.currentPlayer].words[inGameState.currentRound].push('WHOLE');
      const expectedState = { ...inGameState, players: playerListCopy };

      const actualState = reducer(inGameState, guessWhole);

      expect(actualState).toEqual(expectedState);
    });

    test('Guessing an invalid word sets an error about the word being invalid', () => {
      Adagrams.usesAvailableLetters.mockReturnValueOnce(false);
      const guessHippo = makeAction(Actions.GUESS, 'HIPPO');
      const expectedState = { ...inGameState,
        lastError: "HIPPO isn't valid!"
      };

      const actualState = reducer(inGameState, guessHippo);

      expect(actualState).toEqual(expectedState);
    });

    test('Guessing a word used this round sets an error about duplicate guesses', () => {
      const guessWorld = makeAction(Actions.GUESS, 'WORLD');
      const expectedState = { ...inGameState,
        lastError: "WORLD was already guessed!"
      };

      const actualState = reducer(inGameState, guessWorld);

      expect(actualState).toEqual(expectedState);
    });

    test('Guessing a word used in a previous round does NOT set an error about duplicate guesses', () => {
      const guessHello = makeAction(Actions.GUESS, 'HELLO');
      const playerListCopy = deepCopyPlayerList();
      playerListCopy[inGameState.currentPlayer].words[inGameState.currentRound].push('HELLO');
      const expectedState = { ...inGameState, players: playerListCopy };

      const actualState = reducer(inGameState, guessHello);

      expect(actualState).toEqual(expectedState);
    });

    test('Guessing an empty word sets an error about a guess being required', () => {
      const guessEmptyWord = makeAction(Actions.GUESS, '');
      const expectedState = { ...inGameState,
        lastError: "Enter a word!"
      };

      const actualState = reducer(inGameState, guessEmptyWord);

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('Rematch', () => {
    test('Invoking a rematch resets the game with the same parameters', () => {
      const guessWhole = makeAction(Actions.REMATCH);
      const resetPlayerList = mockPlayerList.map(player => ({ ...player, words: [[]] }));
      const expectedState = { ...inGameState,
        players: resetPlayerList,
        currentPlayer: 0,
        currentRound: 0
      };

      const actualState = reducer(inGameState, guessWhole);

      // Ignore currentHand.
      delete expectedState.currentHand;
      delete actualState.currentHand;

      expect(actualState).toMatchObject(expectedState);
    })
  })
});