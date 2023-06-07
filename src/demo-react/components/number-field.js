import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Box, Text, useInput } from 'ink';

import action from '../gamestate/generic-action';

export default function NumberField({
  actionType, dispatch, children, currentValue, isActive
}) {
  const [tempInput, setTempInput] = useState('');

  const inputHandler = useCallback((input, key) => {
    // Allow input that is all digits.
    if (/^[0-9]+$/.test(input)) {
      setTempInput(curr => curr + input);
    }

    if ((key.delete && !key.meta) || key.backspace) {
      setTempInput(curr => curr.slice(0, -1));
    }

    if (key.return) {
      let stateToCommit = '';

      setTempInput(curr => {
        stateToCommit = curr;
        return '';
      });
      
      if (stateToCommit) {
        dispatch(action(actionType, Number(stateToCommit)));
      }
    }
  }, [setTempInput, dispatch, actionType]);

  useInput(inputHandler, { isActive });

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
