const React = require('react');
const { useState } = require('react');

const { Text } = require('ink');

const importJsx = require('import-jsx');
const MainMenu = importJsx('./screens/main-menu');



const App = () => {
  const [message, setMessage] = useState();

  const log = (msg) => {
    setMessage(msg);
  };
  return (
    <>
      <MainMenu log={ log }/>
      <Text>{ message }</Text>
    </>
  );
};

App.propTypes = {};

module.exports = App;
