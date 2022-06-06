const React = require('react');
const { useState } = require('react');

const { Text } = require('ink');

const { useGameReducer } = require('./gamestate/reducer');
const { SetErrorAction, getLastError } = require('./gamestate/errors');
const { SwitchScreenAction, ScreenId, onHelpScreen } = require('./gamestate/screens');

const importJsx = require('import-jsx');
const HowTo = importJsx('./screens/how-to');
const MainMenu = importJsx('./screens/main-menu');

const App = () => {
  const [state, dispatch] = useGameReducer();

  const log = (msg) => {
    dispatch(new SetErrorAction(msg));
  };

  if (onHelpScreen(state)) {
    return (
      <HowTo showMainMenu={ () => dispatch(new SwitchScreenAction(ScreenId.MAIN_MENU)) } />
    );
  }

  return (
    <>
      <MainMenu log={ log } onHelpSelected={ () => dispatch(new SwitchScreenAction(ScreenId.HOW_TO)) } />
      <Text color="red">{ getLastError(state) }</Text>
    </>
  );
};

module.exports = App;
