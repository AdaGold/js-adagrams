import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, useInput } from 'ink';

import Button from './button';

export const MenuEntry = (title, onItemSelected, color) => ({
  color,
  title,
  onItemSelected
});

MenuEntry.propTypes = PropTypes.shape({
  title: PropTypes.string,
  onItemSelected: PropTypes.func,
  color: PropTypes.string
});

export const Menu = ({ isActive, items, onFocusPrevious, width }) => {
  const menu = items;
  const [selectedIdx, setSelectedIdx] = useState(0);

  const inputHandler = (_, key) => {
    if (key.upArrow || key.leftArrow || (key.shift && key.tab)) {
      setSelectedIdx(Math.max(0, selectedIdx - 1));
      if (selectedIdx - 1 < 0) {
        onFocusPrevious();
      }
    } else if (key.downArrow || key.rightArrow || (key.tab)) {
      setSelectedIdx(Math.min(menu.length - 1, selectedIdx + 1));
    } else if (key.return) {
      const onItemSelected = menu[selectedIdx].onItemSelected;
      onItemSelected();
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
            key={ menuEntry.title }
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
  onFocusPrevious: PropTypes.func,
  width: PropTypes.string
};

Menu.defaultProps = {
  isActive: true,
  onFocusPrevious: () => {}
}
