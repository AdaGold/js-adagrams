const React = require('react');

const { Box, Text } = require('ink');

const { SetErrorAction } = require('./gamestate/errors');
const {
  SwitchScreenAction,
  ScreenId,
  onHelpScreen,
  onSetupScreen
} = require('./gamestate/screens');

const importJsx = require('import-jsx');
const HowTo = importJsx('./screens/how-to');
const MainMenu = importJsx('./screens/main-menu');
const SetupGame = importJsx('./screens/game-setup');
const EnterPlayers = importJsx('./screens/enter-players');
const Game = importJsx('./screens/game');
const Win = importJsx('./screens/win');
const { GameStateStore, useGameStateContext } = importJsx('./components/gamestate-context');
const ErrorViewer = importJsx('./components/error-viewer');

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

const App = () => {
  return (
    <GameStateStore>
      <ScreenDisplayer />
    </GameStateStore>
  )
};

module.exports = App;
