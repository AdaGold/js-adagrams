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
        return wrappedReducer(state, action);
    }
  }
}

module.exports = {
  SetErrorAction,
  getLastError,
  errorInterceptor
};
