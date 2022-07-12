import React from 'react';

import { Box, Newline, Text, useApp } from 'ink';

import * as Actions from '../gamestate/action-types';
import { WinScreenInfo } from '../gamestate/win-selectors';
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

  const scores = new WinScreenInfo(state);
  const playerScores = scores.playerScores;
  const roundWinners = scores.roundWinners;
  const winningScore = scores.getWinningScore();
  const winner = scores.getWinner();

  return (
    <Box
      flexDirection='column'
      alignItems='center'
      borderStyle='round'
      padding='1'
    >
      <Box
        borderColor='yellowBright'
        borderStyle='round'
        paddingY='1'
        paddingX='3'
        margin='1'
      >
        <Text>
          <Text color='yellowBright'>{ winner } </Text>
          wins with a score of&nbsp;
          <Text color='yellowBright'>{ winningScore }</Text>!
        </Text>
      </Box>
      <Box
        width='100%'
        marginX='2'
        flexDirection='row'
        justifyContent='space-around'
      >
        <Box
          flexDirection='column'
        >
          <Box marginBottom='1'><Text color='blueBright'>Best words:</Text></Box>
          {
            playerScores.map(p => <Text key={ p.name } color='gray'>{ p.name }: <Text color='blueBright'>{ p.bestWord }</Text></Text>)
          }
        </Box>
        <Box
          flexDirection='column'
        >
          <Box marginBottom='1'><Text color='blueBright'>Leaderboard:</Text></Box>
          {
            playerScores.map(p => <Text key={ p.name } color='gray'>{ p.name }: <Text color='blueBright'>{ p.score }</Text></Text>)
          }
        </Box>
        <Box
          flexDirection='column'
        >
          <Box marginBottom='1'><Text color='blueBright'>Round Winners:</Text></Box>
          {
            roundWinners.map((p, i) => <Text key={ p.name } color='gray'>Round { i + 1 }: <Text color='blueBright'>{ p.name } ({ p.score })</Text></Text>)
          }
        </Box>
      </Box>
     
      <Newline />
      <Menu items={ menu } />
    </Box>
  );
}
