import React from 'react';

import { Text } from 'ink';

import { useGameStateContext } from './gamestate-context';

export default function ErrorViewer() {
  const { state } = useGameStateContext();
  return <Text color='red'>{ state.lastError }</Text>
}
