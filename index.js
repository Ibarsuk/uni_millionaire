const Game = require('./main');

const game = new Game('questions.json', 'highScores.json');
game.main()