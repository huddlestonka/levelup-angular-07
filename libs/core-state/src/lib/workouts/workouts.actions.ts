import { createAction, props } from '@ngrx/store';
import { WorkoutsEntity } from './workouts.models';

export const init = createAction('[Workouts Page] Init');

export const loadWorkoutsSuccess = createAction(
  '[Workouts/API] Load Workouts Success',
  props<{ workouts: WorkoutsEntity[] }>()
);

export const loadWorkoutsFailure = createAction(
  '[Workouts/API] Load Workouts Failure',
  props<{ error: any }>()
);
