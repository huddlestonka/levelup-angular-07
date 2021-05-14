import { Movement } from '@bba/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedMovement = createAction(
  '[Movements] Reset Selected Movement'
);
export const resetMovements = createAction('[Movements] Reset Movements');

// Select Movement
export const selectMovement = createAction(
  '[Movements] Select Movement',
  props<{ selectedId: string }>()
);

// Load Movements
export const loadMovements = createAction('[Movements] Load Movements');

export const loadMovementsSuccess = createAction(
  '[Movements] Load Movements Success',
  props<{ movements: Movement[] }>()
);

export const loadMovementsFailure = createAction(
  '[Movements] Load Movements Failure',
  props<{ error: any }>()
);

// Load Movement
export const loadMovement = createAction(
  '[Movements] Load Movement',
  props<{ movementId: string }>()
);

export const loadMovementSuccess = createAction(
  '[Movements] Load Movement Success',
  props<{ movement: Movement }>()
);

export const loadMovementFailure = createAction(
  '[Movements] Load Movement Failure',
  props<{ error: any }>()
);

// Create Movement
export const createMovement = createAction(
  '[Movements] Create Movement',
  props<{ movement: Movement }>()
);

export const createMovementSuccess = createAction(
  '[Movements] Create Movement Success',
  props<{ movement: Movement }>()
);

export const createMovementFailure = createAction(
  '[Movements] Create Movement Failure',
  props<{ error: any }>()
);

// Update Movement
export const updateMovement = createAction(
  '[Movements] Update Movement',
  props<{ movement: Movement }>()
);

export const updateMovementSuccess = createAction(
  '[Movements] Update Movement Success',
  props<{ movement: Movement }>()
);

export const updateMovementFailure = createAction(
  '[Movements] Update Movement Failure',
  props<{ error: any }>()
);

// Delete Movement
export const deleteMovement = createAction(
  '[Movements] Delete Movement',
  props<{ movement: Movement }>()
);

export const deleteMovementCancelled = createAction(
  '[Movements] Delete Movement Cancelled'
);

export const deleteMovementSuccess = createAction(
  '[Movements] Delete Movement Success',
  props<{ movement: Movement }>()
);

export const deleteMovementFailure = createAction(
  '[Movements] Delete Movement Failure',
  props<{ error: any }>()
);
