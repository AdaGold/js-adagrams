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
  }

  getWinningScore() {
    return this.playerScores[0].score;
  }

  getWinner() {
    return this.playerScores[0].name;
  }
}
