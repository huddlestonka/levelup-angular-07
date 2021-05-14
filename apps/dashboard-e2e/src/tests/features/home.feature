Feature: Home

  As an autheticated user
  I need to be able to work from the home page

  Scenario: See home page on load
    Given I have loaded the app
    Then I should be on the home page

  Scenario: Workout cards on the home page
    Given I am on the home page
    Then I should see all the workout cards

  Scenario: Correct titles on workout cards
    Given I am on the home page
    Then I should see the correct title on each workout card

  Scenario: Correct movements on each workout card
    Given I am on the home page
    Then I should see the correct movements on each workout card

  Scenario: Movements should be read only
    Given I am on the home page
    Then I should see each movement as readonly
