const { defineFeature, loadFeature } = require("jest-cucumber");
const Game = require("../../main");
const fs = require("fs").promises;

const feature = loadFeature("features/hints.feature");

defineFeature(feature, (test) => {
  let question = {
    question: "Кто?",
    content: ["Я", "Он", "Мы", "Ты"],
    correct: 2,
  };

  test("Full hint if all tips are available", ({ given, when, then }) => {
    let game;
    let logSpy;
    when("the game starts", function () {
      game = new Game("questions.json", "highScores.json");
    });

    then("user sees full hint", async function () {
      expect(game.getQuestionHint()).toBe(
        "[50]=50/50 | [ask]=Ask the Audience | [dial]=Dial a Friend | Take a guess... [a],[b],[c],[d]:\t"
      );
    });
  });

  test("Partial hint if some tips are not available", ({
    given,
    when,
    then,
  }) => {
    let game;
    let logSpy;
    when("the game starts", function () {
      game = new Game("questions.json", "highScores.json");
    });

    when("user uses ask audience tip", async function () {
      game.useAsk(question);
    });

    then("user sees partial hint", async function () {
      expect(game.getQuestionHint()).toBe(
        "[50]=50/50 | [dial]=Dial a Friend | Take a guess... [a],[b],[c],[d]:\t"
      );
    });
  });

  test("No hints if all tips are not available", ({ given, when, then }) => {
    let game;
    let logSpy;
    when("the game starts", function () {
      game = new Game("questions.json", "highScores.json");
    });

    when("user uses ask audience tip", async function () {
      game.useAsk(question);
    });

    when("user uses 50/50 tip", async function () {
      game.getFifty("c", [], [], question);
    });

    when("user uses dial friend tip", async function () {
      game.useDial("c", [], []);
    });

    then("user sees no hints", async function () {
      expect(game.getQuestionHint()).toBe("Take a guess... [a],[b],[c],[d]:\t");
    });
  });
});
