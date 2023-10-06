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

    initialiseGame() {
      const placeholders =
        "[\n" +
        '{ "name": "****", "score": 0 },\n' +
        '{ "name": "****", "score": 0 },\n' +
        '{ "name": "****", "score": 0 },\n' +
        '{ "name": "****", "score": 0 },\n' +
        '{ "name": "****", "score": 0 }\n' +
        "]";
  
      const data = fs.readFileSync(this.highScoresFileString, "utf-8");
      const scoresJSON = JSON.parse(data);
      if (scoresJSON == "") {
        console.log("EMPT");
        fs.writeFileSync(this.highScoresFileString, placeholders);
      }
    }

    printHighScores() {
      const data = fs.readFileSync(this.highScoresFileString, "utf-8");
      const scoresJSON = JSON.parse(data);
      console.log("High Scores:");
      let i = 0;
      scoresJSON.forEach((user) => {
        if (i++ < 5) {
          console.log(user.name + "\t" + user.score);
        }
      });
    }
  
    setHighScores(pName, pScore) {
      const data = fs.readFileSync(this.highScoresFileString, "utf-8");
      const scores = JSON.parse(data);
        for (let i = 0; i < 5; i++) {
          const user = scores[i];
          if (pScore > user.score) {
            console.log("Congrats, you made the Leaderboard!");
            scores.push({
              name: pName,
              score: pScore,
            });
            scores.sort(function (a, b) {
              return parseFloat(b.score) - parseFloat(a.score);
            });
            scores.pop(); // pop the 6th score - redundant
            fs.writeFileSync(this.highScoresFileString, JSON.stringify(scores));
            break;
          }
        }
    }

    listQuestionsAndAnswers() {
      JSON.parse(fs.readFileSync(this.fileString, "utf-8")).forEach((question) =>
        console.log(question.question + "\t" + question.content[question.correct])
      );
    }
  
    listQuestions() {
      JSON.parse(fs.readFileSync(this.fileString, "utf-8")).forEach((question) =>
        console.log(question.question)
      );
    }

    getQuestionHint() {
      let helpText = "";
      if (this.fifty50) {
        helpText += "[50]=50/50 | ";
      }
      if (this.askAudience) {
        helpText += "[ask]=Ask the Audience | ";
      }
      if (this.dialFriend) {
        helpText += "[dial]=Dial a Friend | ";
      }
      return helpText + "Take a guess... [a],[b],[c],[d]:\t";
    }
}

module.exports = Game;
