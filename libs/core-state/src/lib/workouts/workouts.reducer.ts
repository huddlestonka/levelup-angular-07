import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as WorkoutsActions from './workouts.actions';
import { WorkoutsEntity } from './workouts.models';

export const WORKOUTS_FEATURE_KEY = 'workouts';

export interface State extends EntityState<WorkoutsEntity> {
  selectedId?: string | number; // which Workouts record has been selected
  loaded: boolean; // has the Workouts list been loaded
  error?: string | null; // last known error (if any)
}

export interface WorkoutsPartialState {
  readonly [WORKOUTS_FEATURE_KEY]: State;
}

export const workoutsAdapter: EntityAdapter<WorkoutsEntity> = createEntityAdapter<WorkoutsEntity>();

export const initialState: State = workoutsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const workoutsReducer = createReducer(
  initialState,
  on(WorkoutsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(WorkoutsActions.loadWorkoutsSuccess, (state, { workouts }) =>
    workoutsAdapter.setAll(workouts, { ...state, loaded: true })
  ),
  on(WorkoutsActions.loadWorkoutsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return workoutsReducer(state, action);
}
