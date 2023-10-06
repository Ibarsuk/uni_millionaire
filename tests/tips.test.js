const Game = require("../main");
const fs = require("fs").promises;
const Util = require("../util");

describe("Tips work correctly", () => {
    let game;
    let question = {"question":"Кто?","content":["Я","Он","Мы","Ты"],"correct":2};
  
    beforeEach(() => {
      game = new Game("./tests/questions.json", "highScores.json");
    });

    it("50/50 works correctly", async () => {
        const logSpy = jest.spyOn(global.console, 'log');

        game.getFifty('c', [], [], question);
        expect(game.fifty50).toBeFalsy();
        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('c\tМы');
        logSpy.mockRestore();
    });

    it("dial works correctly", async () => {
        const logSpy = jest.spyOn(global.console, 'log');

        game.useDial('c', [], []);
        expect(game.dialFriend).toBeFalsy();
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy.mock.calls[0][0].startsWith("You're friend is 80% sure the answer is")).toBeTruthy();
        logSpy.mockRestore();
    });

    it("Ask audience works correctly", async () => {
        const logSpy = jest.spyOn(global.console, 'log');

        game.useAsk(question);
        expect(game.askAudience).toBeFalsy();
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy.mock.calls[0][0].startsWith("The votes are in: out of 100 people, ")).toBeTruthy();
        logSpy.mockRestore();
    });
});