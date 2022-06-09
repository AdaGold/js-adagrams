import React from 'react';

import { SetErrorAction } from '../gamestate/errors';
import {
  SwitchScreenAction,
  ScreenId,
  onHelpScreen,
  onSetupScreen
} from '../gamestate/screens';

import HowTo from './how-to';
import MainMenu from './main-menu';
import SetupGame from './game-setup';
import EnterPlayers from './enter-players';
import Game from './game';
import Win from './win';
import { useGameStateContext } from '../components/gamestate-context';
import ErrorViewer from '../components/error-viewer';

export default function ScreenDisplayer() {
  const { state, dispatch } = useGameStateContext();

  const showHowTo = () => dispatch(new SwitchScreenAction(ScreenId.HOW_TO));
  const showSetupGame = () => dispatch(new SwitchScreenAction(ScreenId.SETUP));
  const log = (msg) => dispatch(new SetErrorAction(msg));

  let screen = (
    <MainMenu
      log={ log }
      onHelpSelected={ showHowTo }
      onStartSelected={ showSetupGame }
    />
  );

  if (onHelpScreen(state)) {
    const showMainMenu = () => dispatch(
      new SwitchScreenAction(ScreenId.MAIN_MENU)
    );

    screen = <HowTo showMainMenu={ showMainMenu } />;
  } else if (onSetupScreen(state)) {
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
