import { Workout } from '@bba/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as WorkoutsActions from './workouts.actions';

export const WORKOUTS_FEATURE_KEY = 'workouts';

export interface WorkoutsState extends EntityState<Workout> {
  selectedId?: string | number; // which Workouts record has been selected
  loaded: boolean; // has the Workouts list been loaded
  error?: string | null; // last known error (if any)
}

export interface WorkoutsPartialState {
  readonly [WORKOUTS_FEATURE_KEY]: WorkoutsState;
}

export const workoutsAdapter: EntityAdapter<Workout> = createEntityAdapter<Workout>();

export const initialWorkoutsState: WorkoutsState = workoutsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

const onFailure = (state, { error }) => ({ ...state, error });

const _workoutsReducer = createReducer(
  initialWorkoutsState,
  on(WorkoutsActions.selectWorkout, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(WorkoutsActions.resetSelectedWorkout, (state) =>
    Object.assign({}, state, { selectedId: null })
  ),
  on(WorkoutsActions.resetWorkouts, (state) =>
    workoutsAdapter.removeAll(state)
  ),
  // Load workouts
  on(WorkoutsActions.loadWorkouts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(WorkoutsActions.loadWorkoutsSuccess, (state, { workouts }) =>
    workoutsAdapter.setAll(workouts, { ...state, loaded: true })
  ),
  on(WorkoutsActions.loadWorkoutsFailure, onFailure),
  // Load workout
  on(WorkoutsActions.loadWorkout, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(WorkoutsActions.loadWorkoutSuccess, (state, { workout }) =>
    workoutsAdapter.upsertOne(workout, { ...state, loaded: true })
  ),
  on(WorkoutsActions.loadWorkoutFailure, onFailure),
  // Add workout
  on(WorkoutsActions.createWorkoutSuccess, (state, { workout }) =>
    workoutsAdapter.addOne(workout, state)
  ),
  on(WorkoutsActions.createWorkoutFailure, onFailure),
  // Update workout
  on(WorkoutsActions.updateWorkoutSuccess, (state, { workout }) =>
    workoutsAdapter.updateOne({ id: workout.id, changes: workout }, state)
  ),
  on(WorkoutsActions.updateWorkoutFailure, onFailure),
  // Delete workout
  on(WorkoutsActions.deleteWorkoutSuccess, (state, { workout }) =>
    workoutsAdapter.removeOne(workout.id, state)
  ),
  on(WorkoutsActions.deleteWorkoutFailure, onFailure)
);

export function workoutsReducer(
  state: WorkoutsState | undefined,
  action: Action
) {
  return _workoutsReducer(state, action);
}
