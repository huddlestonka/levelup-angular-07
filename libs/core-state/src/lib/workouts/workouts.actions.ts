import { Workout } from '@bba/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedWorkout = createAction(
  '[Workouts] Reset Selected Workout'
);
export const resetWorkouts = createAction('[Workouts] Reset Workouts');

// Select Workout
export const selectWorkout = createAction(
  '[Workouts] Select Workout',
  props<{ selectedId: string }>()
);

// Load Workouts
export const loadWorkouts = createAction('[Workouts] Load Workouts');

export const loadWorkoutsSuccess = createAction(
  '[Workouts] Load Workouts Success',
  props<{ workouts: Workout[] }>()
);

export const loadWorkoutsFailure = createAction(
  '[Workouts] Load Workouts Failure',
  props<{ error: any }>()
);

// Load Workout
export const loadWorkout = createAction(
  '[Workouts] Load Workout',
  props<{ workoutId: string }>()
);

export const loadWorkoutSuccess = createAction(
  '[Workouts] Load Workout Success',
  props<{ workout: Workout }>()
);

export const loadWorkoutFailure = createAction(
  '[Workouts] Load Workout Failure',
  props<{ error: any }>()
);

// Create Workout
export const createWorkout = createAction(
  '[Workouts] Create Workout',
  props<{ workout: Workout }>()
);

export const createWorkoutSuccess = createAction(
  '[Workouts] Create Workout Success',
  props<{ workout: Workout }>()
);

export const createWorkoutFailure = createAction(
  '[Workouts] Create Workout Failure',
  props<{ error: any }>()
);

// Update Workout
export const updateWorkout = createAction(
  '[Workouts] Update Workout',
  props<{ workout: Workout }>()
);

export const updateWorkoutSuccess = createAction(
  '[Workouts] Update Workout Success',
  props<{ workout: Workout }>()
);

export const updateWorkoutFailure = createAction(
  '[Workouts] Update Workout Failure',
  props<{ error: any }>()
);

// Delete Workout
export const deleteWorkout = createAction(
  '[Workouts] Delete Workout',
  props<{ workout: Workout }>()
);

export const deleteWorkoutCancelled = createAction(
  '[Workouts] Delete Workout Cancelled'
);

export const deleteWorkoutSuccess = createAction(
  '[Workouts] Delete Workout Success',
  props<{ workout: Workout }>()
);

export const deleteWorkoutFailure = createAction(
  '[Workouts] Delete Workout Failure',
  props<{ error: any }>()
);
