import React, { createContext, useContext, useMemo } from 'react';

import { useGameReducer } from '../gamestate/reducer';

export const GameStateContext = createContext();

export function useGameStateContext() {
  return useContext(GameStateContext);
}

export function GameStateStore({ children }) {
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
