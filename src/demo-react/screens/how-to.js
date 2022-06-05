const React = require('react');

const { Text, Box, Newline } = require('ink');

const HowTo = () => {
  return (
    <Box
      flexDirection='row'
      justifyContent='center'
    >
      <Box
        flexDirection='column'
        alignItems='flex-start'
        justifyContent='center'
        padding={1}
        borderStyle="round"
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
      </Box>
    </Box>
  )
};

module.exports = HowTo;
