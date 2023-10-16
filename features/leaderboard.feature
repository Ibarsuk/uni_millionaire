Feature: Leaderboard works correctly

  Scenario: Prints highscores
    When the game starts
    When user prints highScores
    Then user sees highScores

  Scenario: Sets new highscore
    When the game starts
    When user finishes game with high score
    Then user gets into leaderboard

  Scenario: Ignores call if score is low
    When the game starts
    When user finishes game with low score
    Then user does not get into leaderboard