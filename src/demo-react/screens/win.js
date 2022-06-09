import React from 'react';

import { Box, Newline, Text, useApp } from 'ink';

import * as Actions from '../gamestate/action-types';
import { Menu, MenuEntry } from '../components/menu';
import { useGameStateContext } from '../components/gamestate-context';
import Adagrams from 'demo/adagrams';

export default function Win() {
  const { state, dispatch } = useGameStateContext();
  const { exit } = useApp();
  const menu = [
    MenuEntry('Rematch!', () => dispatch({ type: Actions.REMATCH })),
    MenuEntry('Start Over', () => dispatch({ type: Actions.RESET })),
    MenuEntry('Quit', exit, 'red')
  ];

  const playerScores = state.players.map(
    player => { 
      const flattenedWords = [].concat(...player.words);
      const scores = flattenedWords.map(Adagrams.scoreWord);
      const totalScore = scores.reduce((sum, n) => sum + n, 0);
      return {
        name: player.name,
        score: totalScore
      };
    }
  );
  playerScores.sort((a, b) => b.score - a.score);
  const winningScore = playerScores[0].score;
  const winner = playerScores[0].name;

  return (
    <Box
      flexDirection='column'
      alignItems='center'
      borderStyle='round'
      padding='1'
    >
      <Text>
        <Text color='blueBright'>{ winner } </Text>
        wins with a score of&nbsp;
        <Text color='blueBright'>{ winningScore }</Text>!
      </Text>
      <Newline />
      {
        playerScores.map(p => 
          <Text key={ p.name } color='gray'>{ p.name }: { p.score }</Text>
        )
      }
      <Newline />
      <Menu items={ menu } />
    </Box>
  );
}
