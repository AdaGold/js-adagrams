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

describe('Game state reducer', () => {
  describe('Simple actions', () => {
    test('Switch screen', () => {
      assertSimpleActionUpdatesKey(
        Actions.SWITCH_SCREEN, 'currentScreen');
    });

    test('Set number of rounds', () => {
      assertSimpleActionUpdatesKey(
        Actions.SET_NUMBER_ROUNDS, 'roundsPerGame', 1);
    });

    test('Set desired number of players', () => {
      assertSimpleActionUpdatesKey(
        Actions.SET_DESIRED_PLAYERS, 'desiredPlayers', 4);
    });

    test('Set number of seconds per turn', () => {
      const action = makeAction(Actions.SET_TURN_SECONDS, 60);
      const expected = {
        ...initialState,
        gameTimer: 60,
        secondsPerTurn: 60
      }

      const actual = reducer(initialState, action);

      expect(actual).toEqual(expected);
    });

    test('Reset returns to the initial state', () => {
      const action = makeAction(Actions.RESET);
      const currentState = {
        ...initialState,
        currentScreen: ScreenId.WIN
      };

      const actual = reducer(currentState, action);

      expect(actual).toEqual(initialState);
    })
  });

  describe('Add Player', () => {
    // TODO...
    // Test: Add a new player, succeeds
    // Test: Add a player with a blank name, sets error
    // Test: Add a player with the same name as another, sets error
  })

  describe('Error handling', () => {
    test('Set last error', () => {
      assertSimpleActionUpdatesKey(Actions.SET_ERROR, 'lastError');
    });

    // TODO...
    // Test: Error is cleared after any other action.
  });
});