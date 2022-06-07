const React = require('react');

const { Text } = require('ink');

const { useGameStateContext } = require('./gamestate-context');

function ErrorViewer() {
  const { state } = useGameStateContext();
  return <Text color='red'>{ state.lastError }</Text>
}

module.exports = ErrorViewer;
