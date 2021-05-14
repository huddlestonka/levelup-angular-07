import { Workout } from '@bba/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  WORKOUTS_FEATURE_KEY,
  WorkoutsState,
  workoutsAdapter,
} from './workouts.reducer';

// Lookup the 'Workouts' feature state managed by NgRx
export const getWorkoutsState = createFeatureSelector<WorkoutsState>(
  WORKOUTS_FEATURE_KEY
);

const { selectAll, selectEntities } = workoutsAdapter.getSelectors();

export const getWorkoutsLoaded = createSelector(
  getWorkoutsState,
  (state: WorkoutsState) => state.loaded
);

export const getWorkoutsError = createSelector(
  getWorkoutsState,
  (state: WorkoutsState) => state.error
);

export const getAllWorkouts = createSelector(
  getWorkoutsState,
  (state: WorkoutsState) => selectAll(state)
);

export const getWorkoutsEntities = createSelector(
  getWorkoutsState,
  (state: WorkoutsState) => selectEntities(state)
);

export const getSelectedWorkoutId = createSelector(
  getWorkoutsState,
  (state: WorkoutsState) => state.selectedId
);

export const getSelectedWorkout = createSelector(
  getWorkoutsEntities,
  getSelectedWorkoutId,
  (entities, selectedId) => {
    const emptyWorkout: Workout = {
      id: null,
      title: '',
      description: '',
    };

    return selectedId ? entities[selectedId] : emptyWorkout;
  }
);
