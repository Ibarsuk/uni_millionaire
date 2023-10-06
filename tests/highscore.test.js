const Game = require("../main");
const fs = require("fs").promises;
const Util = require("../util");

describe("Leaderboard works correctly", () => {
    let game;
  
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
      game = new Game("questions.json", "./tests/highScores.json");
    });
  
    it("Prints highscores", async () => {
      const logSpy = jest.spyOn(global.console, 'log');
      game.printHighScores();
  
      expect(logSpy).toHaveBeenCalledTimes(6);
      expect(logSpy.mock.calls[1][0]).toBe('Joboe\t9');
      expect(logSpy.mock.calls[5][0]).toBe('Go\t6');
      logSpy.mockRestore();
    });
  
    it("Sets new highscore", async () => {
      game.setHighScores('USER', 7);
  
      const json = await fs.readFile("./tests/highScores.json", "utf8");
  
      expect(JSON.parse(json)).toEqual([
          { name: "Joboe", score: 9 },
          { name: "Joe", score: 8 },
          { name: "USER", score: 7 },
          { name: "Joseph", score: 6 },
          { name: "Jo", score: 6 },
        ]);
    });
  
    it("Ignores call if score is low", async () => {
      game.setHighScores('USER', 5);
  
      const json = await fs.readFile("./tests/highScores.json", "utf8");
  
      expect(JSON.parse(json)).toEqual([
          { name: "Joboe", score: 9 },
          { name: "Joe", score: 8 },
          { name: "Joseph", score: 6 },
          { name: "Jo", score: 6 },
          { name: "Go", score: 6 },
        ]);
    });
  });