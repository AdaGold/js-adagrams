const React = require('react');
const PropTypes = require('prop-types');

const { Box, Text } = require('ink');

const importJsx = require('import-jsx');
const Actions = require('../gamestate/action-types');
const { Menu, MenuEntry } = importJsx('../components/menu');
const { useGameStateContext } = importJsx('../components/gamestate-context');

function Win(props) {
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

Win.propTypes = {
};

module.exports = Win;
