import { initialState, reducer } from 'demo-react/gamestate/reducer';
import * as Actions from 'demo-react/gamestate/action-types';
import makeAction from 'demo-react/gamestate/generic-action';
import { ScreenId } from 'demo-react/gamestate/screens';

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
]


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
});