const React = require('react');

const { Text } = require('ink');

const { useGameReducer } = require('./gamestate/reducer');
const { SetErrorAction, getLastError } = require('./gamestate/errors');
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

const App = () => {
  const [state, dispatch] = useGameReducer();

  if (onHelpScreen(state)) {
    const showMainMenu = () => dispatch(
      new SwitchScreenAction(ScreenId.MAIN_MENU)
    );

    return <HowTo showMainMenu={ showMainMenu } />;
  }

  if (onSetupScreen(state)) {
    return <SetupGame state={ state } dispatch={ dispatch } />;
  }

  if (state.currentScreen === ScreenId.ENTER_PLAYERS) {
    return <Text color='yellowBright'>TODO: allow player entry</Text>
  }

  const showHowTo = () => dispatch(new SwitchScreenAction(ScreenId.HOW_TO));
  const showSetupGame = () => dispatch(new SwitchScreenAction(ScreenId.SETUP));
  const log = (msg) => dispatch(new SetErrorAction(msg));
  return (
    <>
      <MainMenu
        log={ log }
        onHelpSelected={ showHowTo }
        onStartSelected={ showSetupGame }
      />
      <Text color="red">{ getLastError(state) }</Text>
    </>
  );
};

module.exports = App;
