Feature: Correct hints are provided

  Scenario: Full hint if all tips are available
    When the game starts
    Then user sees full hint

  Scenario: Partial hint if some tips are not available
    When the game starts
    When user uses ask audience tip
    Then user sees partial hint

    Scenario: No hints if all tips are not available
    When the game starts
    When user uses ask audience tip
    When user uses 50/50 tip
    When user uses dial friend tip
    Then user sees no hints