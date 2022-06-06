function action(type, value) {
  return { type, payload: value };
}

module.exports = action;