const React = require('react');
const PropTypes = require('prop-types');

const { Box, Text } = require('ink');

function Button({ children, isSelected }) {
  return (
    <Box paddingX='1' marginX='2' borderStyle='round'>
      <Text inverse={ isSelected }>{ children }</Text>
    </Box>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  isSelected: PropTypes.bool.isRequired
};

Button.defaultProps = {
  isSelected: false
}

module.exports = Button;
