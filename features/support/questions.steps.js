const {defineFeature, loadFeature} = require('jest-cucumber')
const Game = require("../../main");
const fs = require("fs").promises;

const feature = loadFeature('features/questions.feature');

defineFeature(feature, test => {
    test('Questions are printed out', ({ given, when, then }) => {
        let game;
        let logSpy;
        when('the game starts for questions', function () {
            game = new Game("./tests/questions.json", "highScores.json")
          });

          when('admin lists question', async function () {
            logSpy = jest.spyOn(global.console, "log");
            game.listQuestions();
        });

        then('user sees questions', async function () {
          expect(logSpy).toHaveBeenCalledWith("Кто?");
          logSpy.mockRestore();
          });
    });

    test('Questions with answers are printed out', ({ given, when, then }) => {
        let game;
        let logSpy
        when('the game starts for questions', function () {
            game = new Game("./tests/questions.json", "highScores.json")
          });

          when('admin lists question with answers', async function () {
            logSpy = jest.spyOn(global.console, "log");
  
            game.listQuestionsAndAnswers();
          });

          then('user sees questions with answers', async function () {
            expect(logSpy).toHaveBeenCalledWith("Кто?\tМы");
            logSpy.mockRestore();
          });
    });
  });