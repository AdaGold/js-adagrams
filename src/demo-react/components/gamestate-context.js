import React, { createContext, useContext, useMemo } from 'react';

import { useGameReducer } from '../gamestate/reducer';

const GameStateContext = createContext();

function useGameStateContext() {
  return useContext(GameStateContext);
}

function GameStateStore({ children }) {
  const [state, dispatch] = useGameReducer();
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <GameStateContext.Provider value={ contextValue }>
      { children }
    </GameStateContext.Provider>
  );
}

module.exports = {
  GameStateStore,
  GameStateContext,
  useGameStateContext
};
