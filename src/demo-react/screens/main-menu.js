import React from 'react';
import PropTypes from 'prop-types';

import { Box, useApp } from 'ink';

import { useGameStateContext } from '../components/gamestate-context';
import { Menu, MenuEntry } from '../components/menu';
import { SwitchScreenAction, ScreenId } from '../gamestate/screens';

export default function MainMenu() {
  const { exit } = useApp();
  const { dispatch } = useGameStateContext();

  const mainMenu = [
    MenuEntry('Start New Game', () => dispatch(new SwitchScreenAction(ScreenId.SETUP))),
    MenuEntry('How to Play', () => dispatch(new SwitchScreenAction(ScreenId.HOW_TO))),
    MenuEntry('Quit', exit, 'red')
  ];

  return (
    <Box
      flexDirection='row'
      alignItems='center'
      justifyContent='center'
      borderStyle='single'
      paddingY='2'
    >
      <Menu items={ mainMenu } />
    </Box>
  );
}
