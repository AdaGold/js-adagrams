import makeAction from './generic-action';
import { ADVANCE_TURN, TICK } from './action-types';

export function timerMiddleware(reducer) {
  return (state, action) => {
    if (action.type !== TICK) {
      return reducer(state, action);
    }

    // On a tick, do the following:
    // 1. If time is left on the clock, decrement the timer.
    // 2. If the timer is at 0, advance the turn.
    if (state.gameTimer > 1) {
      return {
        ...state,
        gameTimer: state.gameTimer - 1
      };
    } else {
      // Advance the turn and reset the game timer.
      const turnAdvancedState = reducer(state, makeAction(ADVANCE_TURN));
      return { ...turnAdvancedState, gameTimer: state.secondsPerTurn }
    }
  }
}
