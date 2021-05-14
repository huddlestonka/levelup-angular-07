Feature: Movements

  As an autheticated user
  I need to be able to work with movements

  Scenario: Navigate to movements
    Given I am on the home page
    And I navigate to the "movements" page
    Then I should see "movements" in the URL

  Scenario: View a list of movements
    Given I am on the "movements" page
    Then I should see movements in the movements list

  Scenario: Create a movement
    Given I am on the "movements" page
    And I have just created a new movement
    Then I should see that movement in the movements list

  Scenario: Select a movement
    Given I am on the "movements" page
    And I have just created a new movement
    And I select the new movement
    Then I should see the new movement details

  Scenario: Cancel movement selection
    Given I am on the "movements" page
    And I have just created a new movement
    And I select the new movement
    And I click on the cancel button
    Then I should see the details form reset

  Scenario: Update a movement
    Given I am on the "movements" page
    And I have just created a new movement
    And I select the new movement
    And I update the movement
    And I select the updated movement
    Then I should see the updated movement details

  Scenario: Delete a movement
    Given I am on the "movements" page
    And I have just created a new movement
    And I delete the new movement
    Then I should not see the new movement in the list
