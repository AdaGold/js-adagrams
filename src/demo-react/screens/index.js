import React from 'react';

import { ScreenId } from '../gamestate/screens';

import HowTo from './how-to';
import MainMenu from './main-menu';
import SetupGame from './game-setup';
import EnterPlayers from './enter-players';
import Game from './game';
import Win from './win';
import { useGameStateContext } from '../components/gamestate-context';
import ErrorViewer from '../components/error-viewer';

export default function ScreenDisplayer() {
  const { state } = useGameStateContext();

  let screen = <MainMenu />;

  if (state.currentScreen === ScreenId.HOW_TO) {
    screen = <HowTo />;
  } else if (state.currentScreen === ScreenId.SETUP) {
    screen = <SetupGame />;
  } else if (state.currentScreen === ScreenId.ENTER_PLAYERS) {
    screen = <EnterPlayers />;
  } else if (state.currentScreen === ScreenId.GAME) {
    screen = <Game />;
  } else if (state.currentScreen === ScreenId.WIN) {
    screen = <Win />;
  }

  return (
    <>
      { screen }
      <ErrorViewer />
    </>
  );
}
