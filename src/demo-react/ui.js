import React from 'react';

import { SetErrorAction } from './gamestate/errors';
import {
  SwitchScreenAction,
  ScreenId,
  onHelpScreen,
  onSetupScreen
} from './gamestate/screens';

import HowTo from './screens/how-to';
import MainMenu from './screens/main-menu';
import SetupGame from './screens/game-setup';
import EnterPlayers from './screens/enter-players';
import Game from './screens/game';
import Win from './screens/win';
import { GameStateStore, useGameStateContext } from './components/gamestate-context';
import ErrorViewer from './components/error-viewer';

function ScreenDisplayer() {
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

export default function App() {
  return (
    <GameStateStore>
      <ScreenDisplayer />
    </GameStateStore>
  )
}
