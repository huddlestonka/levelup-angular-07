export const state = {
  route: '/',
};

export const getWorkoutCards = () => cy.get('[data-cy=home-workout-cards]');

export const getWorkouts = () =>
  cy.get('[data-cy=home-workout-cards]>mat-card');

export const getWorkoutCardTitle = (workout) =>
  cy.get(`[data-cy=home-workout-${workout.id}-title]`);

export const getWorkoutCardMovements = (workout) =>
  cy.get(`[data-cy=home-workout-${workout.id}-title]`);

export const getWorkoutCardMovementItem = (movement) =>
  cy.get(`[data-cy=movement=${movement.id}-item]`);

export const checkWorkoutsDisplayed = (workouts) => {
  getWorkouts().should('have.length', workouts.length);
};

export const checkWorkoutTitles = (workouts) => {
  workouts.forEach((workout) => {
    getWorkoutCardTitle(workout).should('contain.text', workout.title);
  });
};

export const checkWorkoutMovements = (workouts, movements) => {
  workouts.forEach((workout) => {
    const workoutMovements = movements.filter(
      (movement) => movement.workoutId === workout.id
    );
    getWorkoutCardMovements(workout).should(
      'have.length',
      workoutMovements.length
    );
  });
};
