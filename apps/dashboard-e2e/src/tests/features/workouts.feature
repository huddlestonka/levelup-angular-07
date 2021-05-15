Feature: Workouts

  As an autheticated user
  I need to be able to work with workouts

  Scenario: Navigate to workouts
    Given I am on the home page
    And I navigate to the "workouts" page
    Then I should see "workouts" in the URL

  Scenario: View a list of workouts
    Given I am on the "workouts" page
    Then I should see workouts in the workouts list

  Scenario: Create a workout
    Given I am on the "workouts" page
    And I have just created a new workout
    Then I should see that workout in the workouts list

  Scenario: Select a workout
    Given I am on the "workouts" page
    And I have just created a new workout
    And I select the new workout
    Then I should see the new workout details

  Scenario: Cancel workout selection
    Given I am on the "workouts" page
    And I have just created a new workout
    And I select the new workout
    And I click on the cancel button
    Then I should see the details form reset

  Scenario: Update a workout
    Given I am on the "workouts" page
    And I have just created a new workout
    And I select the new workout
    And I update the workout
    And I select the updated workout
    Then I should see the updated workout details

  Scenario: Delete a workout
    Given I am on the "workouts" page
    And I have just created a new workout
    And I delete the new workout
    Then I should not see the new workout in the list
