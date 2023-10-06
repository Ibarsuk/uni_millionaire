const fs = require("fs");
const Util = require("./util");
const prompt = require("prompt-sync")();

class Game {
  constructor(fileString, highScoresFileString) {
    this.fileString = fileString;
    this.highScoresFileString = highScoresFileString;
    this.lilArray = ["a", "b", "c", "d"];

    this.askAudience = true;
    this.fifty50 = true;
    this.dialFriend = true;

    this.userName = null;
    this.userScore = 0;
  }
}

module.exports = Game;
