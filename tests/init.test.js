const Game = require("../main");
const fs = require("fs").promises;
const Util = require("../util");

describe("Scores are inited properly", () => {
  let game;

  beforeEach(() => {
    game = new Game("questions.json", "./tests/empty.json");
  });

  it("New board if empty", async () => {
    await fs.writeFile("./tests/empty.json", "[]");
    game.initialiseGame();
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

  it("Nothing if board is not empty", async () => {
    await fs.writeFile("./tests/empty.json", "[1,2]");
    game.initialiseGame();
    const json = await fs.readFile("./tests/empty.json", "utf8");
    expect(json).toBe("[1,2]");
  });
});