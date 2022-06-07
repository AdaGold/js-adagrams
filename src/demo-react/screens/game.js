const React = require('react');

const { Box, Text } = require('ink');

const importJsx = require('import-jsx');
const { useGameStateContext } = importJsx('../components/gamestate-context');

function Game() {
  const { state, dispatch } = useGameStateContext();

  return (
    <Box flexDirection='column'>
      <Text color='yellowBright'>TODO: Add game screen!</Text>
      { state.players.map((player, idx) => <Text key={player.name}>{idx+1}: {player.name}</Text>)}
    </Box>
  )
}

module.exports = Game;
