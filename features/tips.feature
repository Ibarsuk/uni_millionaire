Feature: Tips work correctly

  Scenario: 50/50 works correctly
    When the game starts
    When user uses 50/50 tip
    Then user sees right answer and one more

  Scenario: dial friend works correctly
    When the game starts
    When user uses dial friend tip
    Then user sees friend suggestion

    Scenario: Ask audience works correctly
    When the game starts
    When user uses ask audience tip
    Then user sees audience votes