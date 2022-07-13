import Adagrams from 'demo-react/adagrams';

export class WinScreenInfo {
  constructor(state) {
    this.playerScores = state.players.map(
      player => { 
        const flattenedWords = [].concat(...player.words);
        const scores = flattenedWords.map(Adagrams.scoreWord);
        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        const bestWord = Adagrams.highestScoreFrom(flattenedWords);
        return {
          name: player.name,
          score: totalScore,
          bestWord: bestWord && `${bestWord.word} (${bestWord.score})` || ''
        };
      }
    );
    this.playerScores.sort((a, b) => b.score - a.score);

    this.roundWinners = new Array(state.players[0].words.length);
    for (let i = 0; i < this.roundWinners.length; ++i) {
      const playerScoresThisRound = state.players.map(player => {
        const scores = player.words[i].map(Adagrams.scoreWord);
        const roundScore = scores.reduce((sum, score) => sum + score, 0);
        return {
          score: roundScore,
          name: player.name
        };
      });
      playerScoresThisRound.sort((a, b) => b.score - a.score);
      this.roundWinners[i] = playerScoresThisRound[0];
    }
  }

  getWinningScore() {
    return this.playerScores[0].score;
  }

  getWinner() {
    return this.playerScores[0].name;
  }
}
