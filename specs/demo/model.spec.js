import Model from 'demo/model';
import Adagrams from 'demo/adagrams';

describe('Game Model', () => {
  const config = {
    players: [
      'Player A',
      'Player B',
    ],
    rounds: 3,
    time: 60, // Seconds
  };

  describe('constructor', () => {
    it.skip('creates a new Model instance', () => {
      const model = new Model(config);

      expect(model).toBeInstanceOf(Model);
    });

    it.skip('requires a config parameter', () => {
      expect(() => {
        const model = new Model();
      }).toThrow(/config/);
    });

    it.skip('initializes the round number to zero', () => {
      const model = new Model(config);

      expect(model.round).toBe(0);
    });

    it.skip('initializes the current player to null', () => {
      const model = new Model(config);

      expect(model.currentPlayer).toBe(null);
    });

    it.skip('initializes the letter bank to null', () => {
      const model = new Model(config);

      expect(model.letterBank).toBe(null);
    });

    it.skip('initializes the plays history', () => {
      const model = new Model(config);

      expect(model.plays).toBeInstanceOf(Object);
      config.players.forEach((player) => {
        expect(model.plays).toHaveProperty(player);
        expect(model.plays[player]).toBeInstanceOf(Array);
        expect(model.plays[player]).toHaveLength(0);
      });
    });
  });

  describe('.currentPlayerName()', () => {
    it.skip('is defined', () => {
      const model = new Model(config);

      expect(model.currentPlayerName).toBeDefined();
    });

    it.skip('returns the name of the current player when game is on-going', () => {
      const model = new Model(config);

      model.nextRound();

      expect(model.currentPlayerName()).toEqual(model.config.players[0]);
    });

    it.skip('returns null when the game is not on-going', () => {
      const model = new Model(config);

      expect(model.currentPlayerName()).toBe(null);
    });
  });

  describe('.nextRound', () => {
    it.skip('is defined', () => {
      const model = new Model(config);

      expect(model.nextRound).toBeDefined();
    });

    it.skip('increments the round number', () => {
      const model = new Model(config);
      const roundBefore = model.round;

      model.nextRound();

      expect(model.round).toBe(roundBefore + 1);
    });

    it.skip('initializes the current player number to first player', () => {
      const model = new Model(config);

      model.nextRound();

      expect(model.currentPlayer).toBe(0);
    });

    it.skip('initializes the round play history for first player', () => {
      const model = new Model(config);

      model.nextRound();

      config.players.forEach((player) => {
        const roundPlays = model.plays[player][model.round - 1];

        expect(roundPlays).toBeInstanceOf(Array);
        expect(roundPlays).toHaveLength(0);
      });
    });

    it.skip('draws a new hand of letters', () => {
      const model = new Model(config);

      model.nextRound();

      expect(model.letterBank).toBeInstanceOf(Array);
      expect(model.letterBank).toHaveLength(10);
      model.letterBank.forEach((letter) => {
        expect(letter).toMatch(/^[A-Z]$/);
      });
    });

    describe('returns game state', () => {
      it.skip('gameOver', () => {
        const model = new Model({ ...config, rounds: 1 });

        const gameState = model.nextRound();

        expect(gameState).toBeInstanceOf(Object);
        expect(gameState.gameOver).toBe(false);

        const gameOverState = model.nextRound();
        expect(gameOverState.gameOver).toBe(true);
      });

      it.skip('winner', () => {
        const model = new Model({ ...config, rounds : 2 });

        // Start game, no one has won yet
        let gameState = model.nextRound();
        expect(gameState.winner).toBe(null);

        // First player plays a word
        let p1Score = 0;
        let word = model.letterBank.slice(0, 5).join('');
        p1Score += model.playWord(word);

        // Second player does not play
        model.nextTurn();
        gameState = model.nextRound();
        // Game is not over, so no winner yet
        expect(gameState.winner).toBe(null);

        // First player plays another word
        word = model.letterBank.slice(0, 5).join('');
        p1Score += model.playWord(word);

        // Second player does not play again
        model.nextTurn();
        gameState = model.nextRound();

        // Game is over now, first player has won
        expect(gameState.winner).toMatchObject({
          player: config.players[0],
          score: p1Score,
        });
      });
    });
  });

  describe('.nextTurn', () => {
    const getModel = () => {
      const model = new Model(config);
      model.nextRound();

      return model;
    };

    it.skip('is defined', () => {
      const model = getModel();

      expect(model.nextTurn).toBeDefined();
    });

    it.skip('increments the current player index', () => {
      const model = getModel();
      const origPlayer = model.currentPlayer;

      model.nextTurn();
      expect(model.currentPlayer).toBe(origPlayer + 1);

      model.nextTurn();
      expect(model.currentPlayer).toBe(origPlayer + 2);
    });

    describe('returns round state', () => {
      it.skip('roundOver', () => {
        const model = getModel();

        const roundState = model.nextTurn();

        // Expect that we have at least two players, or round is over immediately
        expect(config.players.length).toBeGreaterThan(1);

        expect(roundState).toBeInstanceOf(Object);
        expect(roundState).toHaveProperty('roundOver');
        expect(roundState.roundOver).toBe(false);

        // Advance to the final turn
        config.players.slice(2).forEach(() => {
          model.nextTurn();
        });

        // Complete the final turn, round should be over
        const roundOverState = model.nextTurn();
        expect(roundOverState.roundOver).toBe(true);
      });

      it.skip('winner', () => {
        const model = getModel();

        const roundState = model.nextTurn();

        // winner should be null if round is not over
        expect(roundState.roundOver).toBe(false);
        expect(roundState.winner).toBe(null);

        // Advance to the final turn
        config.players.slice(2).forEach(() => {
          model.nextTurn();
        });

        // Play a word as the last player
        const word = model.letterBank.slice(0, 5).join('');
        const score = model.playWord(word);

        // Complete the final turn, round is over and winner should be set
        const roundOverState = model.nextTurn();
        expect(roundOverState.roundOver).toBe(true);

        expect(roundOverState.winner).toBeInstanceOf(Object);
        expect(roundOverState.winner).toMatchObject({
          word,
          score,
          player: config.players[config.players.length - 1],
        });
      });
    });
  });

  describe('.playWord', () => {
    const getModel = () => {
      const model = new Model(config);
      model.nextRound();

      return model;
    };

    const getPlays = (model, player, round) => {
      return [...(model.plays[player][round - 1] || [])];
    };

    it.skip('is defined', () => {
      const model = getModel();

      expect(model.playWord).toBeDefined();
    });

    describe('for valid words', () => {
      const getWord = (model) => {
        return model.letterBank.slice(0, 5).join('');
      };

      it.skip('it returns the word score', () => {
        const model = getModel();
        const word = getWord(model);
        const score = Adagrams.scoreWord(word);

        expect(model.playWord(word)).toBe(score);
      });

      it.skip('adds word to plays history for current player', () => {
        const model = getModel();
        const player = model.currentPlayerName();
        const origPlays = getPlays(model, player, model.round);

        const word1 = getWord(model);
        model.playWord(word1);
        expect(getPlays(model, player, model.round)).toEqual([...origPlays, word1]);

        const word2 = getWord(model);
        model.playWord(word2);
        expect(getPlays(model, player, model.round)).toEqual([...origPlays, word1, word2]);
      });

      it.skip('validates word case-insensitively', () => {
        const model = getModel();
        const word = getWord(model);
        const score = Adagrams.scoreWord(word);

        expect(model.playWord(word.toLowerCase())).toBe(score);
      });
    });

    describe('for invalid words', () => {
      const getWord = (model) => {
        const letter = model.letterBank[0];
        return letter.repeat(model.letterBank.filter((l) => {
          return l === letter;
        }).length + 1);
      };

      it.skip('it returns null', () => {
        const model = getModel();
        const word = getWord(model);

        expect(model.playWord(word)).toBe(null);
        expect(model.playWord('123')).toBe(null);
        expect(model.playWord('')).toBe(null);
      });

      it.skip('does not add word to history', () => {
        const model = getModel();
        const word = getWord(model);
        const origPlays = {...model.plays};

        model.playWord(word);

        expect(model.plays).toEqual(origPlays);
      });
    });
  });
});
