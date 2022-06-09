import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';

import basicAction from '../gamestate/generic-action';
import { GUESS } from '../gamestate/action-types';
import GameTimer from '../components/timer';
import { useGameStateContext } from '../components/gamestate-context';

import Adagrams from 'demo/adagrams';

export default function Game() {
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
            {idx + 1}: { wordInCurrentRound } ({ Adagrams.scoreWord(wordInCurrentRound) })
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
