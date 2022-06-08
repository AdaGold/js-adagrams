const basicAction = require('./generic-action');
const Actions = require('./action-types');

// For debugging
const { SetErrorAction } = require('./errors');

function timerMiddleware(wrappedReducer) {
  return (state, action) => {
    if (action.type !== Actions.TICK) {
      return wrappedReducer(state, action);
    }

    // On a tick, do the following:
    // 1. If time is left on the clock, decrement the timer.
    // 2. If the timer is at 0, advance the turn.

    let newStateForDebug = state;

    if (state.gameTimer > 1) {
      return {
        ...state,
        gameTimer: state.gameTimer - 1
      };
    } else {
      const advanceTurnAction = basicAction(Actions.ADVANCE_TURN);
      const turnAdvancedState = wrappedReducer(state, advanceTurnAction);
      return {
        ...turnAdvancedState,
        gameTimer: state.secondsPerTurn
      }
    }
  }
}

module.exports = {
  timerMiddleware
};