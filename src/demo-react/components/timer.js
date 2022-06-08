const React = require('react');
const { useEffect } = React;
const PropTypes = require('prop-types');

const { Box, Text } = require('ink');

const Actions = require('../gamestate/action-types');

const importJsx = require('import-jsx');
const { useGameStateContext } = importJsx('../components/gamestate-context');

function GameTimer() {
  const { state, dispatch } = useGameStateContext();

  useEffect(() => {
    const tick = () => {
      dispatch({ type: Actions.TICK });
    };

    const timer = setInterval(tick, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  let color = 'green';

  if (state.gameTimer <= 10 && state.gameTimer > 5) {
    color = 'yellow';
  } else if (state.gameTimer <= 5) {
    color = 'red';
  }

  return (
    <Text>Time: <Text color={ color }>{ state.gameTimer }</Text></Text>
  )
}

module.exports = GameTimer;
