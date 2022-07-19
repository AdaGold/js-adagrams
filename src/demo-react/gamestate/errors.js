import { SET_ERROR } from './action-types';

export class SetErrorAction {
  constructor(message) {
    this.type = SET_ERROR;
    this.payload = message;
  }
}

export function withLastError(wrappedReducer) {
  // Intercept any error actions and forward the rest to the wrapped reducer.
  return (state, action) => {
    switch(action.type) {
      case SET_ERROR:
        return {
          ...state,
          lastError: action.payload
        };
      default:
        // If no error, any new action clears the last error state.
        const errorRemovedState = {
          ...state,
          lastError: ''
        };
        return wrappedReducer(errorRemovedState, action);
    }
  }
}
