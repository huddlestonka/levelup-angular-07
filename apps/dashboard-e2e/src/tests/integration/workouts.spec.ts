import {
  clearForm,
  createWorkout,
  deleteWorkout,
  getWorkoutDetailsTitle,
  getWorkoutItem,
  getWorkouts,
  selectWorkout,
  state,
  updateWorkout,
} from '../../support/pages/workouts.po';

describe('Workouts', () => {
  const model = 'workouts';
  let workouts = null;

  before(() => {
    cy.fixture('workouts').then((json) => (workouts = json));
    cy.loadData(['workouts']);
    cy.visit(state.route);
  });

  it('should be on the workouts page', () => {
    cy.checkLocation(state.route);
  });

  it('should list all workouts', () => {
    getWorkouts().should('have.length', workouts.length);
  });

  it('should create a workout', () => {
    createWorkout(model, state.newMockWorkout);
    getWorkoutItem(state.newMockWorkout).should('exist');
  });

  it('should display a selected workout details', () => {
    clearForm();
    selectWorkout(state.newMockWorkout);
    getWorkoutDetailsTitle().should(
      'contain.text',
      `Editing ${state.newMockWorkout.title}`
    );
  });

  it('should clear workout details the form on cancel', () => {
    selectWorkout(state.newMockWorkout);
    clearForm();
    getWorkoutDetailsTitle().should('contain.text', `Select Workout`);
  });

  it('should update a workout', () => {
    selectWorkout(state.updatedMockWorkout);
    updateWorkout(model, state.updatedMockWorkout);
    getWorkoutItem(state.updatedMockWorkout).should('exist');
  });

  it('should delete a workout', () => {
    deleteWorkout(model, state.updatedMockWorkout);
    getWorkoutItem(state.updatedMockWorkout).should('not.exist');
    getWorkouts().should('have.length', workouts.length);
  });
});
