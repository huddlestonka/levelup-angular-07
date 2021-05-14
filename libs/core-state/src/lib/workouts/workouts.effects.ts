import { Injectable } from '@angular/core';
import { Workout } from '@bba/api-interfaces';
import { WorkoutsService } from '@bba/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import * as WorkoutsActions from './workouts.actions';

@Injectable()
export class WorkoutsEffects {
  @Effect() loadWorkouts$ = this.actions$.pipe(
    ofType(WorkoutsActions.loadWorkouts),
    fetch({
      run: (action) =>
        this.workoutsService
          .all()
          .pipe(
            map((workouts: Workout[]) =>
              WorkoutsActions.loadWorkoutsSuccess({ workouts })
            )
          ),
      onError: (action, error) =>
        WorkoutsActions.loadWorkoutsFailure({ error }),
    })
  );

  @Effect() loadWorkout$ = this.actions$.pipe(
    ofType(WorkoutsActions.loadWorkout),
    fetch({
      run: (action) =>
        this.workoutsService
          .find(action.workoutId)
          .pipe(
            map((workout: Workout) =>
              WorkoutsActions.loadWorkoutSuccess({ workout })
            )
          ),
      onError: (action, error) => WorkoutsActions.loadWorkoutFailure({ error }),
    })
  );

  @Effect() createWorkout$ = this.actions$.pipe(
    ofType(WorkoutsActions.createWorkout),
    pessimisticUpdate({
      run: (action) =>
        this.workoutsService
          .create(action.workout)
          .pipe(
            map((workout: Workout) =>
              WorkoutsActions.createWorkoutSuccess({ workout })
            )
          ),
      onError: (action, error) =>
        WorkoutsActions.createWorkoutFailure({ error }),
    })
  );

  @Effect() updateWorkout$ = this.actions$.pipe(
    ofType(WorkoutsActions.updateWorkout),
    pessimisticUpdate({
      run: (action) =>
        this.workoutsService
          .update(action.workout)
          .pipe(
            map((workout: Workout) =>
              WorkoutsActions.updateWorkoutSuccess({ workout })
            )
          ),
      onError: (action, error) =>
        WorkoutsActions.updateWorkoutFailure({ error }),
    })
  );

  @Effect() deleteWorkout$ = this.actions$.pipe(
    ofType(WorkoutsActions.deleteWorkout),
    pessimisticUpdate({
      run: (action) =>
        this.workoutsService
          .delete(action.workout)
          .pipe(
            map((workout: Workout) =>
              WorkoutsActions.deleteWorkoutSuccess({ workout })
            )
          ),
      onError: (action, error) =>
        WorkoutsActions.deleteWorkoutFailure({ error }),
    })
  );

  constructor(
    private actions$: Actions,
    private workoutsService: WorkoutsService
  ) {}
}
