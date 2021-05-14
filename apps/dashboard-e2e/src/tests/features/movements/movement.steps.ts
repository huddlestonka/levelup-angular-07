import { Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

import {
  checkMovement,
  checkMovementDetailsTitle,
  checkMovementsLength,
  clearForm,
  createMovement,
  deleteMovement,
  selectMovement,
  state,
  updateMovement,
} from '../../../support/pages/movements.po';

const model = 'movements';
let movements = null;

Before(() => {
  cy.fixture('movements').then((json) => (movements = json));
  cy.loadData(['movements', 'workouts']);
  cy.visit(state.homeRoute);
});

Given(`I am on the home page`, () => cy.checkLocation(state.homeRoute));

When('I have just created a new movement', () => {
  createMovement(model, state.newMockMovement);
});

When('I update the movement', () =>
  updateMovement(model, state.updatedMockMovement)
);

When('I delete the new movement', () =>
  deleteMovement(model, state.newMockMovement)
);

When('I select the new movement', () => {
  clearForm();
  selectMovement(state.newMockMovement);
});

When('I select the updated movement', () => {
  clearForm();
  selectMovement(state.updatedMockMovement);
});

When('I click on the cancel button', () => clearForm());

Then('I should see the details form reset', () => {
  checkMovementDetailsTitle('Select Movement');
});

Then('I should see {string} in the URL', (route) => {
  cy.checkLocation(`/${route}`);
});

Then('I should see movements in the movements list', () => {
  checkMovementsLength(movements);
});

Then('I should see that movement in the movements list', () => {
  checkMovement(state.newMockMovement);
});

Then('I should see the new movement details', () => {
  checkMovementDetailsTitle(`Editing ${state.newMockMovement.title}`);
});

Then('I should see the updated movement details', () => {
  checkMovementDetailsTitle(`Editing ${state.updatedMockMovement.title}`);
});

Then('I should not see the new movement in the list', () => {
  checkMovement(state.updatedMockMovement, false);
  checkMovementsLength(movements);
});
