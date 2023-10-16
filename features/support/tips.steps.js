const {defineFeature, loadFeature} = require('jest-cucumber')
const Game = require("../../main");
const fs = require("fs").promises;

const feature = loadFeature('features/tips.feature');

defineFeature(feature, test => {
    let question = {"question":"Кто?","content":["Я","Он","Мы","Ты"],"correct":2};

    test('50/50 works correctly', ({ given, when, then }) => {
        let game;
        let logSpy;
        when('the game starts', function () {
            game = new Game("./tests/questions.json", "highScores.json")
          });

          when('user uses 50/50 tip', async function () {
            logSpy = jest.spyOn(global.console, 'log');

        game.getFifty('c', [], [], question);
        });

        then('user sees right answer and one more', async function () {
            expect(game.fifty50).toBeFalsy();
            expect(logSpy).toHaveBeenCalledTimes(2);
            expect(logSpy).toHaveBeenCalledWith('c\tМы');
            logSpy.mockRestore();
          });
    });

    test('dial friend works correctly', ({ given, when, then }) => {
        let game;
        let logSpy
        when('the game starts', function () {
            game = new Game("./tests/questions.json", "highScores.json")
          });

          when('user uses dial friend tip', async function () {
            logSpy = jest.spyOn(global.console, 'log');

        game.useDial('c', [], []);
          });

          then('user sees friend suggestion', async function () {
            expect(game.dialFriend).toBeFalsy();
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy.mock.calls[0][0].startsWith("You're friend is 80% sure the answer is")).toBeTruthy();
        logSpy.mockRestore();
          });
    });

    test('Ask audience works correctly', ({ given, when, then }) => {
        let game;
        let logSpy
        when('the game starts', function () {
            game = new Game("./tests/questions.json", "highScores.json")
          });

          when('user uses ask audience tip', async function () {
            logSpy = jest.spyOn(global.console, 'log');

        game.useAsk(question);
          });

          then('user sees audience votes', async function () {
            expect(game.askAudience).toBeFalsy();
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy.mock.calls[0][0].startsWith("The votes are in: out of 100 people, ")).toBeTruthy();
        logSpy.mockRestore();
          });
    });
  });