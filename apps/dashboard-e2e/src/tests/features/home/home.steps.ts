import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps';
import {
  checkWorkoutMovements,
  checkWorkoutTitles,
  checkWorkoutsDisplayed,
} from '../../../support/pages/home.po';
import { checkMovementsReadOnly } from '../../../support/pages/movements.po';

let workouts = null;
let movements = null;

Before(() => {
  cy.loadData(['workouts', 'movements']);
  cy.fixture('workouts').then((json) => (workouts = json));
  cy.fixture('movements').then((json) => (movements = json));
  cy.visit('/');
});

Then(`I should see all the workout cards`, () =>
  checkWorkoutsDisplayed(workouts)
);

Then(`I should see the correct title on each workout card`, () =>
  checkWorkoutTitles(workouts)
);

Then(`I should see the correct movements on each workout card`, () =>
  checkWorkoutMovements(workouts, movements)
);

Then(`I should see each movement as readonly`, () =>
  checkMovementsReadOnly(movements)
);
