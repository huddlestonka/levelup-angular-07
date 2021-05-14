export const state = {
  route: '/workouts',
  homeRoute: '/',
  newMockWorkout: {
    id: 'E2E_WORKOUT_ID',
    title: 'E2E Mock Workout',
    description: 'E2E Mock Description',
  },
  updatedMockWorkout: {
    id: 'E2E_WORKOUT_ID',
    title: 'E2E Mock Workout!!',
    description: 'E2E Mock Description Updated',
  },
};

export const getWorkoutsList = () => cy.get('[data-cy=workouts-list]');

export const getWorkouts = () =>
  cy.get('[data-cy=workouts-list]>mat-list-item');

export const getWorkoutItem = (workout) =>
  cy.get(`[data-cy=workout-${workout.id}-item]`);

export const getWorkoutTitle = (workout) =>
  cy.get(`[data-cy=workout-${workout.id}-item-title]`);

export const getWorkoutDeleteBtn = (workout) =>
  cy.get(`[data-cy=delete-workout-${workout.id}-btn]`);

export const getWorkoutDetailsTitle = () =>
  cy.get('[data-cy=workout-details-title]');

export const selectWorkout = (workout) => getWorkoutItem(workout).click();

export const clearForm = () => cy.get('[data-cy=workout-form-cancel]').click();

export const completeNewWorkoutForm = (workout) => {
  cy.get(`[data-cy=workout-form-title]`).type(workout.title, { delay: 20 });
  cy.get(`[data-cy=workout-form-description]`).type(workout.description, {
    delay: 20,
  });
  cy.get('[data-cy=workout-form-save]').click();
};

export const completeUpdateWorkoutForm = (workout) => {
  cy.get(`[data-cy=workout-form-title]`)
    .clear()
    .type(`${workout.title}!!`, { delay: 20 });
  cy.get(`[data-cy=workout-form-description]`)
    .clear()
    .type(`${workout.description} updated`, { delay: 20 });
  cy.get('[data-cy=workout-form-save]').click();
};

export const createWorkout = (model, workout) => {
  cy.createEntity(model, workout);
  completeNewWorkoutForm(workout);
};

export const updateWorkout = (model, workout) => {
  cy.updateEntity(model, workout);
  completeUpdateWorkoutForm(workout);
};

export const deleteWorkout = (model, workout) => {
  cy.deleteEntity(model, workout);
  getWorkoutDeleteBtn(workout).click();
};

export const checkWorkoutDetailsTitle = (title) => {
  getWorkoutDetailsTitle().should('contain.text', title);
};

export const checkWorkoutsLength = (workouts) => {
  getWorkouts().should('have.length', workouts.length);
};

export const checkWorkout = (workout, exists = true) => {
  const condition = exists ? 'exist' : 'not.exist';
  getWorkoutItem(workout).should(condition);
};
