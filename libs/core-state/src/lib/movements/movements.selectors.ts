import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MOVEMENTS_FEATURE_KEY,
  State,
  MovementsPartialState,
  movementsAdapter,
} from './movements.reducer';

// Lookup the 'Movements' feature state managed by NgRx
export const getMovementsState = createFeatureSelector<
  MovementsPartialState,
  State
>(MOVEMENTS_FEATURE_KEY);

const { selectAll, selectEntities } = movementsAdapter.getSelectors();

export const getMovementsLoaded = createSelector(
  getMovementsState,
  (state: State) => state.loaded
);

export const getMovementsError = createSelector(
  getMovementsState,
  (state: State) => state.error
);

export const getAllMovements = createSelector(
  getMovementsState,
  (state: State) => selectAll(state)
);

export const getMovementsEntities = createSelector(
  getMovementsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getMovementsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getMovementsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
