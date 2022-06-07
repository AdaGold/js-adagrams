const { SET_ERROR } = require('./action-types');

class SetErrorAction {
  constructor(message) {
    this.type = SET_ERROR;
    this.payload = message;
  }
}

function getLastError(state) {
  return state.lastError
}

function errorInterceptor(wrappedReducer) {
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

module.exports = {
  SetErrorAction,
  getLastError,
  errorInterceptor
};
