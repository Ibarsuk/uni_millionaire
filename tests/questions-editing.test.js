const Game = require("../main");
const fs = require("fs").promises;
const Util = require("../util");

describe("Modifies questions", () => {
    let game;
  
    beforeEach(() => {
      game = new Game("./tests/questions-empty.json", "highScores.json");
    });
  
    it("Adds question", async () => {
      await fs.writeFile("./tests/questions-empty.json", "[]");
      game.insertQuestion(
        "Много?",
        ["Нормально", "Достаточно", "Мало", "Много"],
        0
      );
      const json = await fs.readFile("./tests/questions-empty.json", "utf8");
      console.log(JSON.parse(json));
      expect(JSON.parse(json)).toEqual([
        {
          question: "Много?",
          content: ["Нормально", "Достаточно", "Мало", "Много"],
          correct: 0,
        },
      ]);
    });
  
    it("Deletes question", async () => {
      await fs.writeFile(
        "./tests/questions-empty.json",
        JSON.stringify([
          {
            question: "Много?",
            content: ["Нормально", "Достаточно", "Мало", "Много"],
            correct: 0,
          },
        ])
      );
      game.removeQuestion(() => 0);
      const json = await fs.readFile("./tests/questions-empty.json", "utf8");
      expect(JSON.parse(json)).toEqual([]);
    });
  });