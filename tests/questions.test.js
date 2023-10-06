const Game = require("../main-copy");
const fs = require("fs").promises;
const Util = require("../util");

describe("Questions are printed into console", () => {
    let game;
  
    beforeEach(() => {
      game = new Game("./tests/questions.json", "highScores.json");
    });
  
    it("Questions are printed out", async () => {
      const logSpy = jest.spyOn(global.console, "log");
  
      game.listQuestions();
      expect(logSpy).toHaveBeenCalledWith("Кто?");
      logSpy.mockRestore();
    });
  
    it("Questions with answers are printed out", async () => {
      const logSpy = jest.spyOn(global.console, "log");
  
      game.listQuestionsAndAnswers();
      expect(logSpy).toHaveBeenCalledWith("Кто?\tМы");
      logSpy.mockRestore();
    });
  });