const {defineFeature, loadFeature} = require('jest-cucumber')
const Game = require("../../main");
const fs = require("fs").promises;

const feature = loadFeature('features/leaderboard-init.feature');

defineFeature(feature, test => {
    test('Empty leaderboard', ({ given, when, then }) => {
        let game;
        when('the game starts for init', function () {
            game = new Game("questions.json", "./tests/empty.json")
          });

          when('the game is initialized with empty table', async function () {
            await fs.writeFile("./tests/empty.json", "[]");
            game.initialiseGame();
        });

        then('user sees template leaderboard', async function () {
            const json = await fs.readFile("./tests/empty.json", "utf8");
            expect(json).toBe(
                "[\n" +
                  '{ "name": "****", "score": 0 },\n' +
                  '{ "name": "****", "score": 0 },\n' +
                  '{ "name": "****", "score": 0 },\n' +
                  '{ "name": "****", "score": 0 },\n' +
                  '{ "name": "****", "score": 0 }\n' +
                  "]"
              );
          });
    });

    test('Existing leaderboard', ({ given, when, then }) => {
        let game;
        when('the game starts for init', function () {
            game = new Game("questions.json", "./tests/empty.json")
          });

          when('the game is initialized with existing table', async function () {
            await fs.writeFile("./tests/empty.json", "[1,2]");
              game.initialiseGame();
          });

          then('user sees existing leaderboard', async function () {
            const json = await fs.readFile("./tests/empty.json", "utf8");
            expect(json).toBe("[1,2]");
          });
    });
  });