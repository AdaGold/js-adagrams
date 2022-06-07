const React = require('react');
const PropTypes = require('prop-types');

const { Box, useApp } = require('ink');

const importJsx = require('import-jsx');
const { Menu, MenuEntry } = importJsx('../components/menu');

const MainMenu = ({ log, onHelpSelected, onStartSelected }) => {
  const { exit } = useApp();
  const mainMenu = [
    MenuEntry('Start New Game', 'start'),
    MenuEntry('How to Play', 'help'),
    MenuEntry('Quit', 'quit', 'red')
  ];

  const handleSelection = (selectionId) => {
    log(`MainMenu: Received '${selectionId}'.`);
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
  log: PropTypes.func,
  onHelpSelected: PropTypes.func.isRequired,
  onStartSelected: PropTypes.func.isRequired
}

module.exports = MainMenu;
