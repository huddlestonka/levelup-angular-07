export const state = {
  route: '/movements',
  homeRoute: '/',
  newMockMovement: {
    id: 'E2E_MOVEMENT_ID',
    title: 'E2E Mock Movement',
    description: 'E2E Mock Description',
  },
  updatedMockMovement: {
    id: 'E2E_MOVEMENT_ID',
    title: 'E2E Mock Movement!!',
    description: 'E2E Mock Description Updated',
  },
};

export const getMovementsList = () => cy.get('[data-cy=movements-list]');

export const getMovements = () =>
  cy.get('[data-cy=movements-list]>mat-list-item');

export const getMovementItem = (movement) =>
  cy.get(`[data-cy=movement-${movement.id}-item]`);

export const getMovementTitle = (movement) =>
  cy.get(`[data-cy=movement-${movement.id}-item-title]`);

export const getMovementDeleteBtn = (movement) =>
  cy.get(`[data-cy=delete-movement-${movement.id}-btn]`);

export const getMovementDetailsTitle = () =>
  cy.get('[data-cy=movement-details-title]');

export const selectMovement = (movement) => getMovementItem(movement).click();

export const clearForm = () => cy.get('[data-cy=movement-form-cancel').click();

export const completeNewMovementForm = (movement) => {
  cy.get(`[data-cy=movement-form-title]`).type(movement.title, { delay: 20 });
  cy.get(`[data-cy=movement-form-description]`).type(movement.description, {
    delay: 20,
  });
  cy.get('[data-cy=movement-form-save]').click();
};

export const completeUpdateMovementForm = (movement) => {
  cy.get(`[data-cy=movement-form-title]`)
    .clear()
    .type(`${movement.title}!!`, { delay: 20 });
  cy.get(`[data-cy=movement-form-description]`)
    .clear()
    .type(`${movement.description} updated`, { delay: 20 });
  cy.get('[data-cy=movement-form-save]').click();
};

export const createMovement = (model, movement) => {
  cy.createEntity(model, movement);
  completeNewMovementForm(movement);
};

export const updateMovement = (model, movement) => {
  cy.updateEntity(model, movement);
  completeUpdateMovementForm(movement);
};

export const deleteMovement = (model, movement) => {
  cy.deleteEntity(model, movement);
  getMovementDeleteBtn(movement).click();
};

export const checkMovementsReadOnly = (movements) => {
  movements.forEach((movement) => {
    getMovementDeleteBtn(movement).should('not.exist');
  });
};

export const checkMovementDetailsTitle = (title) => {
  getMovementDetailsTitle().should('contain.text', title);
};

export const checkMovementsLength = (movements) => {
  getMovements().should('have.length', movements.length);
};

export const checkMovement = (movement, exists = true) => {
  const condition = exists ? 'exist' : 'not.exist';
  getMovementItem(movement).should(condition);
};
