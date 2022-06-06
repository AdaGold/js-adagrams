const React = require('react');
const PropTypes = require('prop-types');

const { Box, Text } = require('ink');

function Button(props) {
  // TODO: Try using `inverse` for selected, instead.
  const bgColor = props.isSelected ? 'white' : '';
  const color = props.isSelected ? 'black' : '';
  return (
    <Box paddingX='1' marginX='2' borderStyle='round'>
      <Text color={ color } backgroundColor={ bgColor }>{ props.children }</Text>
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
