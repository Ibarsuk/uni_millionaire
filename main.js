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
            scores.pop();
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

    insertQuestion(question, content, answer) {
      const data = fs.readFileSync(this.fileString, "utf-8");
      const questions = JSON.parse(data);
      questions.push({
        question: question,
        content: content,
        correct: answer,
      });
      fs.writeFileSync(this.fileString, JSON.stringify(questions));
    }

    addQuestion() {
      let theQ = prompt("Enter your question: ");
      let choiceA = prompt("Enter choice a: ");
      let choiceB = prompt("Enter choice b: ");
      let choiceC = prompt("Enter choice c: ");
      let choiceD = prompt("Enter choice d: ");
      let answer = prompt("Enter which is answer [0],[1],[2],[3] : ");
      insertQuestion(theQ, [choiceA, choiceB, choiceC, choiceD], answer);
    }

    removeQuestion(getNumberToDelete) {
      const data = fs.readFileSync(this.fileString, "utf-8");
      const questions = JSON.parse(data);
      let deleteNumber = getNumberToDelete(questions);
      questions.splice(deleteNumber, 1);
      fs.writeFileSync(this.fileString, JSON.stringify(questions));
    }
  
    deleteQuestion() {
      this.removeQuestion((questions) => {
        questions.forEach((q, i) => console.log(i + "\t" + q.question));
        let deleteNumber = prompt(
          "Which number question do you wish to delete [0],[1],[2],...?"
        );
        return deleteNumber;
      });
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

    getFifty(correct, incorrectArray, shuffledIncorrectArray, question) {
      this.fifty50 = false;
      incorrectArray = this.lilArray.filter((e) => e !== correct);
      shuffledIncorrectArray = Util.shuffleArray(incorrectArray);
      let incorrect2 = shuffledIncorrectArray[0];
      let incorrect2Pos = this.lilArray.indexOf(incorrect2);
      Util.shuffleArray([
        [correct, question.content[question.correct]],
        [incorrect2, question.content[incorrect2Pos]],
      ]).forEach((el) => console.log(el[0] + "\t" + el[1]));
    }

    useDial(correct, incorrectArray, shuffledIncorrectArray) {
      this.dialFriend = false;
      const chance = Util.getRandomNumberBetween(1, 10);
      let dialText = "You're friend is 80% sure the answer is ";
      if (chance > 2) {
        dialText += correct;
      } else {
        incorrectArray = this.lilArray.filter((e) => e !== correct);
        shuffledIncorrectArray = Util.shuffleArray(incorrectArray);
        let incorrect2 = shuffledIncorrectArray[0];
  
        dialText += incorrect2;
      }
      console.log(dialText);
    }

    useAsk(question) {
      const audienceCount = 100;
            let countArray = [0, 0, 0, 0];
            this.askAudience = false;
            let chance = 0;
            for (let i = 0; i < audienceCount; i++) {
              chance = Util.getRandomNumberBetween(1, 10);
              if (chance >= 4) {
                countArray[question.correct]++;
              } else {
                countArray[Util.getRandomNumberBetween(0, 3)]++;
              }
            }
            console.log(
              "The votes are in: out of 100 people, " +
                countArray[0] +
                " say 'a', " +
                countArray[1] +
                " say 'b', " +
                countArray[2] +
                " say 'c', " +
                countArray[3] +
                " say 'd'"
            );
    }

    printMainMenu() {
      const mainMenuText =
        "\nMillionaire Game\n====================\n\n[1] Play Millionaire Game\n[2] Game Admin\n[3] Top Five Scores\n[0] CANCEL\n\n";
      console.log(mainMenuText);
      this.mainMenuPrompt();
    }
  
    mainMenuPrompt() {
      while (true) {
        const mainPrompt = prompt("Select option? [1, 2, 3, 0]:\t");
        if (mainPrompt == 1) {
          // this.playGame();
          return;
        } else if (mainPrompt == 2) {
          // this.doAdmin();
          return;
        } else if (mainPrompt == 3) {
          this.printHighScores();
          return;
        } else if (mainPrompt == 0) {
          console.log("See you again soon! ");
          return;
        }
      }
    }

    main() {
      this.initialiseGame();
      this.printMainMenu();
    }
}

module.exports = Game;
