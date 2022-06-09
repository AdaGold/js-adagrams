import React, { useState, useCallback, useEffect } from 'react';

import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';

import { ScreenId, SwitchScreenAction } from '../gamestate/screens';
import basicAction from "../gamestate/generic-action";
import Actions from '../gamestate/action-types';
import { useGameStateContext } from '../components/gamestate-context';

export default function EnterPlayers() {
  const { state, dispatch } = useGameStateContext();
  const [inputText, setInputText] = useState('');

  const nextPlayerIdx = state.players.length + 1;

  useEffect(() => {
    if (nextPlayerIdx > state.desiredPlayers) {
      dispatch(new SwitchScreenAction(ScreenId.GAME));
    }
  }, [dispatch, nextPlayerIdx]);

  const handleChange = useCallback((text) => {
    setInputText(text);
  }, [setInputText]);

  const handleSubmit = useCallback((text) => {
    setInputText('');

    dispatch(basicAction(Actions.ADD_PLAYER, text));
  }, [dispatch, nextPlayerIdx, state.desiredPlayers, setInputText]);

  return (
    <Box
      flexDirection='row'
      justifyContent='center'
      borderStyle='round'
      padding='2'
    > 
      <Box
        flexDirection='column'
        alignItems='flex-start'
        flexBasis='27'
      >
        <Text>Enter name for Player { nextPlayerIdx }:</Text>
        <Box>
          <Text>&gt; </Text>
          <TextInput showCursor value={inputText} onChange={ handleChange } onSubmit={ handleSubmit } />
        </Box>
      </Box>
    </Box>
  );
}
