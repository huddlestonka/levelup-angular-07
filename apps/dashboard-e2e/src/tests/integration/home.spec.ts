import {
  getWorkoutCardMovements,
  getWorkoutCardTitle,
  getWorkouts,
  state,
} from '../../support/pages/home.po';

import { getMovementDeleteBtn } from '../../support/pages/movements.po';

describe('Home', () => {
  let workouts = null;
  let movements = null;

  before(() => {
    cy.loadData(['workouts', 'movements']);
    cy.fixture('workouts').then((json) => (workouts = json));
    cy.fixture('movements').then((json) => (movements = json));
    cy.visit('/');
  });

  it('should be on the home page', () => {
    cy.checkLocation(state.route);
  });

  describe('Cards', () => {
    it('should list all workout cards', () => {
      getWorkouts().should('have.length', workouts.length);
    });

    it('should have the correct workout title on each card', () => {
      workouts.forEach((workout) => {
        getWorkoutCardTitle(workout).should('contain.text', workout.title);
      });
    });

    it('should display the correct movements for each workout', () => {
      workouts.forEach((workout) => {
        const workoutMovements = movements.filter(
          (movement) => movement.workoutId === workout.id
        );
        getWorkoutCardMovements(workout).should(
          'have.length',
          workoutMovements.length
        );
      });
    });

    it('should display movements as readonly', () => {
      movements.forEach((movement) => {
        getMovementDeleteBtn(movement).should('not.exist');
      });
    });
  });
});
