const React = require('react');
const PropTypes = require('prop-types');

const { Box, Text } = require('ink');

function Button({ children, color, isSelected }) {
  return (
    <Box paddingX='1' marginX='2' borderStyle='round' borderColor={ color }>
      <Text inverse={ isSelected } color={ color }>{ children }</Text>
    </Box>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  isSelected: PropTypes.bool.isRequired
};

Button.defaultProps = {
  isSelected: false
}

module.exports = Button;
