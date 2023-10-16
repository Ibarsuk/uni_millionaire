Feature: Initialization of a leaderboard

  Scenario: Empty leaderboard
    When the game starts for init
    When the game is initialized with empty table
    Then user sees template leaderboard

  Scenario: Existing leaderboard
    When the game starts for init
    When the game is initialized with existing table
    Then user sees existing leaderboard