const React = require('react');
const { useState } = React;
const PropTypes = require('prop-types');
const { Box, Text, useInput } = require('ink');

const {
  SET_DESIRED_PLAYERS,
  SET_NUMBER_ROUNDS,
  SET_TURN_SECONDS
} = require('../gamestate/action-types');
const { ScreenId, SwitchScreenAction } = require('../gamestate/screens');

const importJsx = require('import-jsx');
const { Menu, MenuEntry } = importJsx('../components/menu');
const NumberField = importJsx('../components/number-field');

function SetupGame({ state, dispatch }) {
  const fields = [ SET_DESIRED_PLAYERS, SET_NUMBER_ROUNDS, SET_TURN_SECONDS, 'menu' ];
  const [selectedField, setSelectedField] = useState(SET_DESIRED_PLAYERS);

  useInput((input, key) => {
    const idxSelected = fields.indexOf(selectedField);
    if (key.return || (!key.shift && key.tab) || key.downArrow || key.rightArrow) {
      setSelectedField(fields[idxSelected + 1]);
    } else if ((key.shift && key.tab) || key.upArrow || key.leftArrow) {
      setSelectedField(fields[Math.max(0, idxSelected - 1)]);
    }
  }, { isActive: selectedField !== 'menu' });

  const selectFieldBeforeMenu = () => {
    const idxMenu = fields.indexOf('menu');
    setSelectedField(fields[idxMenu - 1]);
  }

  // TODO: MenuEntry could use a callback instead of this selection ID concept.
  const menu = [
    MenuEntry('Enter Names', 'names'),
    MenuEntry('Go Back', 'go-back')
  ]
  const handleSelection = (selectionId) => {
    switch(selectionId) {
      case 'names':
        dispatch(new SwitchScreenAction(ScreenId.ENTER_PLAYERS));
        break;
      case 'go-back':
        dispatch(new SwitchScreenAction(ScreenId.MAIN_MENU));
        break;
    }
  }

  const { lastError } = state;

  return (
    <>
    <Box
      flexDirection='row'
      justifyContent='center'
      padding={1}
      borderStyle='round'
      width='100%'
    >
      <Box
        flexDirection='column'
        alignItems='flex-start'
        justifyContent='center'
      >
        <NumberField
          actionType={ SET_DESIRED_PLAYERS }
          dispatch={ dispatch }
          isActive={ selectedField === SET_DESIRED_PLAYERS }
          currentValue={ state.desiredPlayers }
        >
          Number of players (1-4)
        </NumberField>
        <NumberField
          actionType={ SET_NUMBER_ROUNDS }
          dispatch={ dispatch }
          isActive={ selectedField === SET_NUMBER_ROUNDS }
          currentValue={ state.roundsPerGame }
        >
          Number of rounds (1-5)
        </NumberField>
        <NumberField
          actionType={ SET_TURN_SECONDS }
          dispatch={ dispatch }
          isActive={ selectedField === SET_TURN_SECONDS }
          currentValue={ state.secondsPerTurn }
        >
          Seconds per player per round (10-60)
        </NumberField>
        <Menu
          onItemSelected={ handleSelection }
          onFocusPrevious={ selectFieldBeforeMenu }
          items={ menu }
          isActive={ selectedField === 'menu' }
        />
      </Box>
    </Box>
    <Text color='red'>{ lastError }</Text>
    </>
  )
}

SetupGame.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

module.exports = SetupGame;
