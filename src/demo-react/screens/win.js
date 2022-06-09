import React from 'react';

import { Box, Text } from 'ink';

import * as Actions from '../gamestate/action-types';
import { Menu, MenuEntry } from '../components/menu';
import { useGameStateContext } from '../components/gamestate-context';

export default function Win() {
  const { state, dispatch } = useGameStateContext();
  const menu = [
    MenuEntry('Rematch!', () => dispatch({ type: Actions.REMATCH })),
    MenuEntry('Start Over', () => dispatch({ type: Actions.RESET }), 'red')
  ];

  return (
    <Box
      flexDirection='column'
      alignItems='center'
      borderStyle='round'
      padding='1'
    >
      <Text color='yellow'>TODO: Make a win screen!</Text>
      <Menu items={ menu } />
    </Box>
  );
}
