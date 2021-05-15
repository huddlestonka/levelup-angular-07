import {
  clearForm,
  completeNewMovementForm,
  completeUpdateMovementForm,
  getMovementDeleteBtn,
  getMovementDetailsTitle,
  getMovementItem,
  getMovements,
  selectMovement,
  state,
} from '../../support/pages/movements.po';

describe('Movements', () => {
  const model = 'movements';
  let movements = null;

  before(() => {
    cy.fixture('movements').then((json) => (movements = json));
    cy.loadData(['workouts', 'movements']);
    cy.visit(state.route);
  });

  it('should be on the movements page', () => {
    cy.checkLocation(state.route);
  });

  it('should list all movements', () => {
    getMovements().should('have.length', movements.length);
  });

  it('should create a movement', () => {
    cy.createEntity(model, state.newMockMovement);
    cy.loadData(['workouts']);
    completeNewMovementForm(state.newMockMovement);
    getMovementItem(state.newMockMovement).should('exist');
  });

  it('should display a selected movement details', () => {
    clearForm();
    selectMovement(state.newMockMovement);
    getMovementDetailsTitle().should(
      'contain.text',
      `Editing ${state.newMockMovement.title}`
    );
  });

  it('should clear movement details the form on cancel', () => {
    selectMovement(state.newMockMovement);
    clearForm();
    getMovementDetailsTitle().should('contain.text', `Select Movement`);
  });

  it('should update a movement', () => {
    cy.updateEntity(model, state.updatedMockMovement);
    cy.loadData(['workouts']);
    selectMovement(state.updatedMockMovement);
    completeUpdateMovementForm(state.updatedMockMovement);
    getMovementItem(state.updatedMockMovement).should('exist');
  });

  it('should delete a movement', () => {
    cy.deleteEntity(model, state.updatedMockMovement);
    cy.loadData(['workouts']);
    getMovementDeleteBtn(state.updatedMockMovement).click();
    getMovementItem(state.updatedMockMovement).should('not.exist');
    getMovements().should('have.length', movements.length);
  });
});
