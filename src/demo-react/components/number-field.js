const React = require('react');
const { useState } = React;
const PropTypes = require('prop-types');

const { Box, Text, useInput } = require('ink');

const action = require('../gamestate/generic-action');

function NumberField({ actionType, dispatch, children, currentValue, isActive }) {
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

NumberField.propTypes = {
  actionType: PropTypes.string,
  children: PropTypes.node,
  dispatch: PropTypes.func,
  isActive: PropTypes.bool,
  currentValue: PropTypes.number
};

module.exports = NumberField;