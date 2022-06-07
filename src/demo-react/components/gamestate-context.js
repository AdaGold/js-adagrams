const React = require('react');
const { useContext, useMemo } = React;

const { useGameReducer } = require('../gamestate/reducer');

const GameStateContext = React.createContext();

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
