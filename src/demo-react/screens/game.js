const React = require('react');
const PropTypes = require('prop-types');

const { Box, Text } = require('ink');

const importJsx = require('import-jsx');

function Game({ state, dispatch }) {
  return (
    <Box flexDirection='column'>
      <Text color='yellowBright'>TODO: Add game screen!</Text>
      { state.players.map((player, idx) => <Text key={player.name}>{idx+1}: {player.name}</Text>)}
    </Box>
  )
}

Game.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

module.exports = Game;
