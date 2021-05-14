import { Movement } from '@bba/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MOVEMENTS_FEATURE_KEY,
  MovementsState,
  movementsAdapter,
} from './movements.reducer';

// Lookup the 'Movements' feature state managed by NgRx
export const getMovementsState = createFeatureSelector<MovementsState>(
  MOVEMENTS_FEATURE_KEY
);

const { selectAll, selectEntities } = movementsAdapter.getSelectors();

export const getMovementsLoaded = createSelector(
  getMovementsState,
  (state: MovementsState) => state.loaded
);

export const getMovementsError = createSelector(
  getMovementsState,
  (state: MovementsState) => state.error
);

export const getAllMovements = createSelector(
  getMovementsState,
  (state: MovementsState) => selectAll(state)
);

export const getMovementsEntities = createSelector(
  getMovementsState,
  (state: MovementsState) => selectEntities(state)
);

export const getSelectedMovementId = createSelector(
  getMovementsState,
  (state: MovementsState) => state.selectedId
);

export const getSelectedMovement = createSelector(
  getMovementsEntities,
  getSelectedMovementId,
  (entities, selectedId) => {
    const emptyMovement: Movement = {
      id: null,
      title: '',
      description: '',
      workoutId: null,
    };

    return selectedId ? entities[selectedId] : emptyMovement;
  }
);
