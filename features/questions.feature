Feature: Questions are printed into console

  Scenario: Questions are printed out
    When the game starts for questions
    When admin lists question
    Then user sees questions

  Scenario: Questions with answers are printed out
    When the game starts for questions
    When admin lists question with answers
    Then user sees questions with answers