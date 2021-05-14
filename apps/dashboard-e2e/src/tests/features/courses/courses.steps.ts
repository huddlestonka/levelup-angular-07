import { Before, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import {
  checkWorkoutDetailsTitle,
  checkWorkout,
  checkWorkoutsLength,
  clearForm,
  createWorkout,
  deleteWorkout,
  getWorkoutDetailsTitle,
  getWorkoutItem,
  getWorkouts,
  selectWorkout,
  state,
  updateWorkout,
} from '../../../support/pages/workouts.po';

const model = 'workouts';
let workouts = null;

Before(() => {
  cy.fixture('workouts').then((json) => (workouts = json));
  cy.loadData(['workouts', 'lessons']);
  cy.visit(state.homeRoute);
});

Given(`I am on the home page`, () => cy.checkLocation(state.homeRoute));

When('I have just created a new workout', () => {
  createWorkout(model, state.newMockWorkout);
});

When('I update the workout', () =>
  updateWorkout(model, state.updatedMockWorkout)
);

When('I delete the new workout', () =>
  deleteWorkout(model, state.newMockWorkout)
);

When('I select the new workout', () => {
  clearForm();
  selectWorkout(state.newMockWorkout);
});

When('I select the updated workout', () => {
  clearForm();
  selectWorkout(state.updatedMockWorkout);
});

When('I click on the cancel button', () => clearForm());

Then('I should see the details form reset', () => {
  checkWorkoutDetailsTitle('Select Workout');
});

Then('I should see {string} in the URL', (route) => {
  cy.checkLocation(`/${route}`);
});

Then('I should see workouts in the workouts list', () => {
  checkWorkoutsLength(workouts);
});

Then('I should see that workout in the workouts list', () => {
  checkWorkout(state.newMockWorkout);
});

Then('I should see the new workout details', () => {
  checkWorkoutDetailsTitle(`Editing ${state.newMockWorkout.title}`);
});

Then('I should see the updated workout details', () => {
  checkWorkoutDetailsTitle(`Editing ${state.updatedMockWorkout.title}`);
});

Then('I should not see the new workout in the list', () => {
  checkWorkout(state.updatedMockWorkout, false);
  checkWorkoutsLength(workouts);
});
