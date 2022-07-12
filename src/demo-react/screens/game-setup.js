import React, { useState } from 'react';
import { Box, useInput } from 'ink';

import {
  SET_DESIRED_PLAYERS,
  SET_NUMBER_ROUNDS,
  SET_TURN_SECONDS
} from '../gamestate/action-types';
import { ScreenId, SwitchScreenAction } from '../gamestate/screens';

import { Menu, MenuEntry } from '../components/menu';
import NumberField from '../components/number-field';
import { useGameStateContext } from '../components/gamestate-context';

export default function SetupGame() {
  const { state, dispatch } = useGameStateContext();

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

  const menu = [
    MenuEntry('Enter Names', () => dispatch(new SwitchScreenAction(ScreenId.ENTER_PLAYERS))),
    MenuEntry('Go Back', () => dispatch(new SwitchScreenAction(ScreenId.MAIN_MENU)))
  ];

  return (
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
          onFocusPrevious={ selectFieldBeforeMenu }
          items={ menu }
          isActive={ selectedField === 'menu' }
        />
      </Box>
    </Box>
  )
}
