const React = require('react');
const { useEffect, useCallback, useState } = React;
const PropTypes = require('prop-types');

const { Box, Text } = require('ink');
const TextInput = require('ink-text-input').default;

const basicAction = require('../gamestate/generic-action');
const { GUESS } = require('../gamestate/action-types');

const importJsx = require('import-jsx');
const GameTimer = importJsx('../components/timer');
const { useGameStateContext } = importJsx('../components/gamestate-context');

function Game() {
  const { state } = useGameStateContext();
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
            <Text color='yellowBright'>{ letter }</Text>
          </Box>
        ))}
      </Box>
      <Box flexDirection='row' justifyContent='space-around'>
        <Text>Round:&nbsp;
          <Text color='blueBright'>{ state.currentRound + 1 /* 1st round is 0 */ }</Text>
        </Text>
        <GameTimer />
      </Box>
      <Box
        flexDirection='row'
        justifyContent='space-around'
      >
        {
          state.players.map((player, idx) =>
            <PlayerGuesses
              key={player.name}
              isActive={ idx === state.currentPlayer }
              player={ player }
              round={ state.currentRound }
            />
          )
        }
      </Box>
    </Box>
  )
}

function PlayerGuesses({ player, round, isActive }) {
  const { dispatch } = useGameStateContext();
  const [inputText, setInputText] = useState('');

  // Reset text input when isActive changes.
  useEffect(() => {
    setInputText('');
  }, [isActive])

  const handleChange = useCallback((text) => {
    setInputText(text);
  }, [setInputText]);

  const handleSubmit = useCallback((text) => {
    setInputText('');
    dispatch(basicAction(GUESS, text));
  }, [dispatch, setInputText]);

  return (
    <Box flexDirection='column'>
      <Text inverse={ isActive }>{player.name}</Text>
      {
        player.words[round].map((wordInCurrentRound, idx) => 
          <Text key={wordInCurrentRound}>
            {idx + 1}: { wordInCurrentRound }
          </Text>
        )
      }
      <Box flexDirection='row'>
        <Box marginRight='1'>
          <Text>{ isActive ? '>' : ' ' }</Text>
        </Box>
        <TextInput
          showCursor
          focus={ isActive }
          value={ inputText }
          onChange={ handleChange }
          onSubmit={ handleSubmit }
        />
      </Box>
    </Box>
  )
}

PlayerGuesses.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    words: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
  }).isRequired,
  isActive: PropTypes.bool,
  round: PropTypes.number.isRequired
}

module.exports = Game;
