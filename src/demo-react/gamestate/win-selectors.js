import Adagrams from 'demo/adagrams';

export class WinScreenInfo {
  constructor(state) {
    this.playerScores = state.players.map(
      player => { 
        const flattenedWords = [].concat(...player.words);
        const scores = flattenedWords.map(word => ({ word, score: Adagrams.scoreWord(word)}));
        scores.sort((a, b) => b.score - a.score); // Sort by highest scoring word.
        const totalScore = scores.reduce((sum, scoreAndWord) => sum + scoreAndWord.score, 0);
        return {
          name: player.name,
          score: totalScore,
          bestWord: scores.length > 0 && `${scores[0].word} (${scores[0].score})` || ''
        };
      }
    );
    this.playerScores.sort((a, b) => b.score - a.score);

    this.roundWinners = new Array(state.players[0].words.length);
    for (let i = 0; i < this.roundWinners.length; ++i) {
      const playerScoresThisRound = state.players.map(player => {
        const scores = player.words[i].map(word => Adagrams.scoreWord(word));
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
