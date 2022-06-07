const React = require('react');
const { useState } = React;
const PropTypes = require('prop-types');
const { Box, Text, useInput } = require('ink');

const action = require('../gamestate/generic-action');
const {
  SET_DESIRED_PLAYERS,
  SET_NUMBER_ROUNDS,
  SET_TURN_SECONDS
} = require('../gamestate/action-types');

const importJsx = require('import-jsx');
const { Menu, MenuEntry } = importJsx('../components/menu');

function valueOfField(actionType, state) {
  switch(actionType) {
    case SET_DESIRED_PLAYERS: return state.desiredPlayers;
    case SET_NUMBER_ROUNDS: return state.roundsPerGame;
    case SET_TURN_SECONDS: return state.secondsPerTurn;
    default: return null;
  }
}

function SetupGame({ state, dispatch }) {
  const fields = [ SET_DESIRED_PLAYERS, SET_NUMBER_ROUNDS, SET_TURN_SECONDS, 'menu' ];
  const [selectedField, setSelectedField] = useState(SET_DESIRED_PLAYERS);

  useInput((input, key) => {
    const idxSelected = fields.indexOf(selectedField);
    if (key.return || (!key.shift && key.tab) || key.downArrow || key.rightArrow) {
      setSelectedField(fields[idxSelected + 1]);
    } else if ((key.shift && key.tab) || key.upArrow || key.leftArrow) {
      setSelectedField(fields[Math.max(0, idxSelected - 1)]);
    }


  }, { isActive: selectedField !== 'menu' });

  const { lastError } = state;

  return (
    <>
    <Box
      flexDirection='row'
      justifyContent='center'
      padding={1}
      borderStyle='round'
      width='100%'
    >
      <Box
        flexDirection='column'
        alignItems='flex-start'
        justifyContent='center'
      >
        <NumberField
          actionType={ SET_DESIRED_PLAYERS }
          state={ state }
          dispatch={ dispatch }
          isActive={ selectedField === SET_DESIRED_PLAYERS }
        >
          Number of players (1-4)
        </NumberField>
        <NumberField
          actionType={ SET_NUMBER_ROUNDS }
          state={state}
          dispatch={ dispatch }
          isActive={ selectedField === SET_NUMBER_ROUNDS }
        >
          Number of rounds (1-5)
        </NumberField>
        <NumberField
          actionType={ SET_TURN_SECONDS }
          state={ state }
          dispatch={ dispatch }
          isActive={ selectedField === SET_TURN_SECONDS }
        >
          Seconds per player per round (10-60)
        </NumberField>
      </Box>
    </Box>
    <Text color='red'>{ lastError }</Text>
    </>
  )
}

SetupGame.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

function NumberField({ actionType, state, dispatch, children, isActive }) {
  const currentValue = String(valueOfField(actionType, state));
  const [tempInput, setTempInput] = useState('');

  useInput((input, key) => {
    // Allow input that is all digits.
    if (/^[0-9]+$/.test(input)) {
      setTempInput(tempInput + input);
    }

    if (key.return) {
      if (tempInput !== '') {
        dispatch(action(actionType, Number(tempInput)));
      }
      setTempInput('');
    }
  }, { isActive });

  return (
    <Box flexDirection='row' marginY={ 1 }>
      <Box marginX='2' flexBasis={ 2 } flexGrow={ 1 }>
        <Text inverse={ isActive } marginX={ 2 }>{ tempInput || currentValue }</Text>
      </Box>
      <Text>{ children }</Text>
    </Box>
  )
}

module.exports = SetupGame;
