const React = require('react');
const { useState } = require('react');

const { Text } = require('ink');

const importJsx = require('import-jsx');
const HowTo = importJsx('./screens/how-to');
const MainMenu = importJsx('./screens/main-menu');

const App = () => {
  const [message, setMessage] = useState();
  const [screen, setScreen] = useState('mainmenu');

  const log = (msg) => {
    setMessage(msg);
  };

  const showHelp = () => {
    setScreen('help');
  }

  if (screen === 'help') {
    return (
      <>
        <HowTo />
      </>
    );
  }

  return (
    <>
      <MainMenu log={ log } onHelpSelected={ showHelp } />
      <Text>{ message }</Text>
    </>
  );
};

App.propTypes = {};

module.exports = App;
