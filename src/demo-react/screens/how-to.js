const React = require('react');
const PropTypes = require('prop-types');

const importJsx = require('import-jsx');
const { Menu, MenuEntry } = importJsx('../components/menu');

const { Text, Box, Newline } = require('ink');

const HowTo = (props) => {
  const { showMainMenu } = props;
  const oneButtonMenu = [ MenuEntry('Go Back', 'goback') ];

  return (
    <Box
      flexDirection='column'
      alignItems='flex-start'
      justifyContent='center'
      padding={1}
      borderStyle='round'
      width='100%'
    >
      <Text>Select "Start New Game" to play.</Text>
      <Newline />
      <Text>Choose the number of players, rounds, and seconds each person has available for guessing.</Text>
      <Text>Then, enter the name of each player.</Text>
      <Newline />
      <Text>
        Each round, a new set of 10 letters will be chosen. Each player has limited time to
        form words out of the available letters.
      </Text>
      <Text>Whoever has the highest scoring words across all rounds wins the game!</Text>
      <Newline />
      <Menu width='100%' items={ oneButtonMenu } onItemSelected={ showMainMenu } />
    </Box>
  )
};

HowTo.propTypes = {
  showMainMenu: PropTypes.func.isRequired
}

module.exports = HowTo;