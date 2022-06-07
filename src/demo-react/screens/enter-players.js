const React = require('react');
const { useState, useCallback } = React;
const PropTypes = require('prop-types');

const { Box, Text } = require('ink');
const TextInput = require('ink-text-input').default;

const { ScreenId, SwitchScreenAction } = require('../gamestate/screens');
const basicAction = require("../gamestate/generic-action");
const Actions = require('../gamestate/action-types');

function EnterPlayers({ state, dispatch }) {
  const [inputText, setInputText] = useState('');

  const nextPlayerIdx = state.players.length + 1;

  const handleChange = useCallback((text) => {
    setInputText(text);
  }, [setInputText]);

  const handleSubmit = useCallback((text) => {
    setInputText('');

    if (nextPlayerIdx === state.desiredPlayers) {
      dispatch(new SwitchScreenAction(ScreenId.GAME));
    }

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

module.exports = EnterPlayers;