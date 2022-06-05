const React = require('react');

const { useApp } = require('ink');

const importJsx = require('import-jsx');
const { Menu, MenuEntry } = importJsx('../components/menu');

const MainMenu = ({ log }) => {
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
  }

  return <Menu onItemSelected={ handleSelection } items={ mainMenu } />;
}

module.exports = MainMenu;
