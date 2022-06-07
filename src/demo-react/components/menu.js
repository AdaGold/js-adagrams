const React = require('react');
const { useState } = require('react');
const PropTypes = require('prop-types');

const { Box, useInput } = require('ink');

const importJsx = require('import-jsx');
const Button = importJsx('./button');

const MenuEntry = (title, selectionId, color) => ({
  color,
  title,
  selectionId
});

MenuEntry.propTypes = PropTypes.shape({
  title: PropTypes.string,
  selecitonId: PropTypes.string,
  color: PropTypes.string
});

const Menu = ({ isActive, items, onFocusPrevious, onItemSelected, width }) => {
  const menu = items;
  const [selectedIdx, setSelectedIdx] = useState(0);

  const inputHandler = (input, key) => {
    if (key.upArrow || key.leftArrow || (key.shift && key.tab)) {
      setSelectedIdx(Math.max(0, selectedIdx - 1));
      if (selectedIdx - 1 < 0) {
        onFocusPrevious();
      }
    } else if (key.downArrow || key.rightArrow || (key.tab)) {
      setSelectedIdx(Math.min(menu.length - 1, selectedIdx + 1));
    } else if (key.return) {
      const selectedItemId = menu[selectedIdx].selectionId;
      onItemSelected(selectedItemId);
    }

  };
  useInput(inputHandler, { isActive });


  return (
    <Box
      flexDirection='row'
      alignItems='center'
      justifyContent='center'
      width={ width }
    >
      {
        menu.map((menuEntry, idx) =>
          <Button
            key={ menuEntry.selectionId }
            isSelected={ isActive && idx === selectedIdx }
            color={ menuEntry.color }
          >
            { menuEntry.title }
          </Button>
        )
      }
    </Box>
  );
}

Menu.propTypes = {
  isActive: PropTypes.bool,
  items: PropTypes.arrayOf(MenuEntry.propTypes).isRequired,
  onItemSelected: PropTypes.func.isRequired,
  onFocusPrevious: PropTypes.func,
  width: PropTypes.string
};

Menu.defaultProps = {
  isActive: true,
  onFocusPrevious: () => {}
}

module.exports = {
  Menu,
  MenuEntry
};
