import React from 'react';
import PropTypes from 'prop-types';

import { Box, useApp } from 'ink';

import { Menu, MenuEntry } from '../components/menu';

export default function MainMenu({ onHelpSelected, onStartSelected }) {
  const { exit } = useApp();
  const mainMenu = [
    MenuEntry('Start New Game', 'start'),
    MenuEntry('How to Play', 'help'),
    MenuEntry('Quit', 'quit', 'red')
  ];

  const handleSelection = (selectionId) => {
    switch(selectionId) {
      case 'quit': exit(); break;
      case 'help': onHelpSelected(); break;
      case 'start': onStartSelected(); break;
    }
  }

  return (
    <Box
      flexDirection='row'
      alignItems='center'
      justifyContent='center'
      borderStyle='single'
      paddingY='2'
    >
      <Menu onItemSelected={ handleSelection } items={ mainMenu } />
    </Box>
  );
}

MainMenu.propTypes = {
  onHelpSelected: PropTypes.func.isRequired,
  onStartSelected: PropTypes.func.isRequired
}
