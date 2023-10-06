const Game = require("../main");
const fs = require("fs").promises;
const Util = require("../util");

describe("Correct hints", () => {
    let game;
  
    beforeEach(() => {
      game = new Game("questions.json", "highScores.json");
    });
  
    it("Full hint if all tips are available", () => {
      expect(game.getQuestionHint()).toBe(
        "[50]=50/50 | [ask]=Ask the Audience | [dial]=Dial a Friend | Take a guess... [a],[b],[c],[d]:\t"
      );
    });
  
    it("Partial hint if some tips are not available", () => {
      game.askAudience = false;
      expect(game.getQuestionHint()).toBe(
        "[50]=50/50 | [dial]=Dial a Friend | Take a guess... [a],[b],[c],[d]:\t"
      );
    });
  
    it("No hints if all tips are not available", () => {
      game.askAudience = false;
      game.fifty50 = false;
      game.dialFriend = false;
      expect(game.getQuestionHint()).toBe("Take a guess... [a],[b],[c],[d]:\t");
    });
  });