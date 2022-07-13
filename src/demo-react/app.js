import React from 'react';

import ScreenDisplayer from './screens';
import { GameStateStore } from './components/gamestate-context';

export default function App() {
  return (
    <GameStateStore>
      <ScreenDisplayer />
    </GameStateStore>
  )
}
