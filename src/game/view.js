import Vorpal from 'vorpal';
import MESSAGES from 'game/messages.json';

const menu = new Vorpal();

const View = {
  start(play, exit) {
    menu.log(MESSAGES.intro);

    menu.show();
  },

  play() {
    menu.log(MESSAGES.play);
  },

  exit() {
    menu.log(MESSAGES.exit);
  },

  init(callbacks) {
    menu.delimiter('Adagrams>');

    menu
      .command('start [players]')
      .description('Play a game of Adagrams. ')
      .alias('play', 's', 'p')
      .option('-r, --rounds <n>', 'Number of rounds')
      .option('-t, --time <seconds>', 'Time for each round in seconds')
      .action((args, done) => {
        const numPlayers = args.players;
        const rounds = args.options.rounds;
        const time = args.options.time;

        // Player name selection
        const validName = (name) => /\w/.test(name.trim());

        let questions;
        if(!Number.isInteger(numPlayers) || numPlayers < 2) {
          // Default to a solo game
          questions = [{
            name: 'player0',
            message: 'Player Name: ',
            validate: validName
          }];
        } else {
          questions = [...Array(numPlayers).keys()].map((n) => ({
            name: `player${n}`,
            message: `Player ${n + 1} Name: `,
            validate: validName
          }));
        }

        menu.activeCommand.prompt(questions, (answers) => {
          const PROP_REGEX = /^player(\d+)$/;

          let playerNames =
            Object.entries(answers)
            .map(([prop, val]) => [PROP_REGEX.exec(prop), val.trim()])
            .filter(([match, val]) => !!match)
            .sort(([[_, leftNum]], [[__, rightNum]]) => Number(leftNum) - Number(rightNum))
            .map(([_, name]) => name);

          callbacks.play(playerNames, rounds, time);
          done();
        });
      });

    menu
      .find('exit')
      .action((_, done) => {
        callbacks.exit();
        done();
      });
  },
};

export default View;