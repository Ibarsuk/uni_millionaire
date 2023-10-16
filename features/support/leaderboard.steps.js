const {defineFeature, loadFeature} = require('jest-cucumber')
const Game = require("../../main");
const fs = require("fs").promises;

const feature = loadFeature('features/leaderboard.feature');

defineFeature(feature, test => {
    beforeEach(async () => {
        await fs.writeFile(
          "./tests/highScores.json",
          JSON.stringify([  
            { name: "Joboe", score: 9 },
            { name: "Joe", score: 8 },
            { name: "Joseph", score: 6 },
            { name: "Jo", score: 6 },
            { name: "Go", score: 6 },
          ])
        );
      });

    test('Prints highscores', ({ given, when, then }) => {
        let game;
        let logSpy;
        when('the game starts', function () {
            game = new Game("questions.json", "./tests/highScores.json")
          });

          when('user prints highScores', async function () {
            logSpy = jest.spyOn(global.console, 'log');
      game.printHighScores();
        });

        then('user sees highScores', async function () {
            expect(logSpy).toHaveBeenCalledTimes(6);
      expect(logSpy.mock.calls[1][0]).toBe('Joboe\t9');
      expect(logSpy.mock.calls[5][0]).toBe('Go\t6');
      logSpy.mockRestore();
          });
    });

    test('Sets new highscore', ({ given, when, then }) => {
        let game;
        let json
        when('the game starts', function () {
            game = new Game("questions.json", "./tests/highScores.json")
          });

          when('user finishes game with high score', async function () {
            game.setHighScores('USER', 7);
  
      json = await fs.readFile("./tests/highScores.json", "utf8");
          });

          then('user gets into leaderboard', async function () {
            expect(JSON.parse(json)).toEqual([
                { name: "Joboe", score: 9 },
                { name: "Joe", score: 8 },
                { name: "USER", score: 7 },
                { name: "Joseph", score: 6 },
                { name: "Jo", score: 6 },
              ]);
          });
    });

    test('Ignores call if score is low', ({ given, when, then }) => {
        let game;
        let json
        when('the game starts', function () {
            game = new Game("questions.json", "./tests/highScores.json")
          });

          when('user finishes game with low score', async function () {
            game.setHighScores('USER', 5);
  
      json = await fs.readFile("./tests/highScores.json", "utf8");
          });

          then('user does not get into leaderboard', async function () {
            expect(JSON.parse(json)).toEqual([
                { name: "Joboe", score: 9 },
                { name: "Joe", score: 8 },
                { name: "Joseph", score: 6 },
                { name: "Jo", score: 6 },
                { name: "Go", score: 6 },
              ]);
          });
    });
  });