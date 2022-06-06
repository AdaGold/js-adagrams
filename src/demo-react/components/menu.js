const React = require('react');
const { useState } = require('react');
const PropTypes = require('prop-types');

const { Box, useInput } = require('ink');

const importJsx = require('import-jsx');
const Button = importJsx('./button');

const MenuEntry = (title, selectionId) => ({
  title,
  selectionId
});

MenuEntry.propTypes = PropTypes.shape({
  title: PropTypes.string,
  selecitonId: PropTypes.string
});

const Menu = ({ items, onItemSelected }) => {
  const menu = items;
  const [selectedIdx, setSelectedIdx] = useState(0);

  const inputHandler = (input, key) => {
    if (key.upArrow || key.leftArrow) {
      setSelectedIdx(Math.max(0, selectedIdx - 1));
    } else if (key.downArrow || key.rightArrow) {
      setSelectedIdx(Math.min(menu.length - 1, selectedIdx + 1));
    } else if (key.return) {
      const selectedItemId = menu[selectedIdx].selectionId;
      onItemSelected(selectedItemId);
    }

  };
  useInput(inputHandler);


  return (
    <Box
      flexDirection='row'
      alignItems='center'
      justifyContent='center'
    >
      {
        menu.map((menuEntry, idx) =>
          <Button
            key={ menuEntry.selectionId }
            isSelected={ idx === selectedIdx }
          >
            { menuEntry.title }
          </Button>
        )
      }
    </Box>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(MenuEntry.propTypes).isRequired
};

module.exports = {
  Menu,
  MenuEntry
};
