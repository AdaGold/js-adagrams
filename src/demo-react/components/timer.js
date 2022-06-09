import React, { useEffect } from 'react';

import { Text } from 'ink';

import * as Actions from '../gamestate/action-types';

import { useGameStateContext } from '../components/gamestate-context';

export default function GameTimer() {
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
