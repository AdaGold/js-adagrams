const React = require('react');

const { Box, Text } = require('ink');

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
const EnterPlayers = importJsx('./screens/enter-players');

const App = () => {
  // TODO: Instead of sending state & dispatch to all the screens, switch to
  // the context API.
  // See: https://hswolff.com/blog/how-to-usecontext-with-usereducer/#performance-concerns
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
    return <EnterPlayers state={ state } dispatch={ dispatch } />
  }

  if (state.currentScreen === ScreenId.GAME) {
    return (
      <Box flexDirection='column'>
        <Text color='yellowBright'>TODO: Add game screen!</Text>
        { state.players.map((player, idx) => <Text key={player.name}>{idx+1}: {player.name}</Text>)}
      </Box>
    );
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
