const React = require('react');

const { Box, Text } = require('ink');

const importJsx = require('import-jsx');
const GameTimer = importJsx('../components/timer');
const { useGameStateContext } = importJsx('../components/gamestate-context');

function Game() {
  const { state, dispatch } = useGameStateContext();

  return (
    <Box
      flexDirection='column'
      alignItems='stretch'
      padding='1'
      borderStyle='round'
    >
      <Box flexDirection='row' justifyContent='center' marginBottom={1}>
        <Text>Current hand:</Text>
        { state.currentHand && state.currentHand.map((letter, idx) => (
          <Box key={ idx } marginLeft='1'>
            <Text>{ letter }</Text>
          </Box>
        ))}
      </Box>
      <Box flexDirection='row' justifyContent='space-around'>
        <Text>Round: { state.currentRound + 1 }</Text>
        <GameTimer />
      </Box>
      <Box
        flexDirection='row'
        justifyContent='space-around'
      >
        {
          state.players.map((player, idx) =>
            <Box
              flexDirection='column'
              key={player.name}
            >
              <Text inverse={ idx === state.currentPlayer }>{player.name}</Text>
            </Box>
          )
        }
      </Box>
    </Box>
  )
}

module.exports = Game;
