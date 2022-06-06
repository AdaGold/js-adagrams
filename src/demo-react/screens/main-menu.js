const React = require('react');
const PropTypes = require('prop-types');

const { Box, useApp } = require('ink');

const importJsx = require('import-jsx');
const { Menu, MenuEntry } = importJsx('../components/menu');

const MainMenu = ({ log, onHelpSelected }) => {
  const { exit } = useApp();
  const mainMenu = [
    MenuEntry('Start New Game', 'start'),
    MenuEntry('How to Play', 'help'),
    MenuEntry('Quit', 'quit')
  ];

  const handleSelection = (selectionId) => {
    log(`MainMenu: Received '${selectionId}'.`);
    if (selectionId === 'quit') {
      exit();
    }
    if (selectionId === 'help') {
      onHelpSelected();
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
  onHelpSelected: PropTypes.func.isRequired
}

module.exports = MainMenu;
