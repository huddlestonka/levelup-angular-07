import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  WORKOUTS_FEATURE_KEY,
  State,
  WorkoutsPartialState,
  workoutsAdapter,
} from './workouts.reducer';

// Lookup the 'Workouts' feature state managed by NgRx
export const getWorkoutsState = createFeatureSelector<
  WorkoutsPartialState,
  State
>(WORKOUTS_FEATURE_KEY);

const { selectAll, selectEntities } = workoutsAdapter.getSelectors();

export const getWorkoutsLoaded = createSelector(
  getWorkoutsState,
  (state: State) => state.loaded
);

export const getWorkoutsError = createSelector(
  getWorkoutsState,
  (state: State) => state.error
);

export const getAllWorkouts = createSelector(getWorkoutsState, (state: State) =>
  selectAll(state)
);

export const getWorkoutsEntities = createSelector(
  getWorkoutsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getWorkoutsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getWorkoutsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
