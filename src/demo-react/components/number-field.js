import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Text, useInput } from 'ink';

import action from '../gamestate/generic-action';

export default function NumberField({
  actionType, dispatch, children, currentValue, isActive
}) {
  const [tempInput, setTempInput] = useState('');

  // BUG: Backspace not support
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

NumberField.defaultProps = {
  isActive: false
};

NumberField.propTypes = {
  actionType: PropTypes.string,
  children: PropTypes.node,
  dispatch: PropTypes.func,
  isActive: PropTypes.bool,
  currentValue: PropTypes.number
};
