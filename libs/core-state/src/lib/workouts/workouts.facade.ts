import { Injectable } from '@angular/core';
import { Workout } from '@bba/api-interfaces';
import { Action, ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { getWorkoutMovements } from '../index';
import * as WorkoutsActions from './workouts.actions';
import * as WorkoutsSelectors from './workouts.selectors';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsFacade {
  loaded$ = this.store.pipe(select(WorkoutsSelectors.getWorkoutsLoaded));
  allWorkouts$ = this.store.pipe(select(WorkoutsSelectors.getAllWorkouts));
  selectedWorkout$ = this.store.pipe(
    select(WorkoutsSelectors.getSelectedWorkout)
  );
  workoutMovements$ = this.store.pipe(select(getWorkoutMovements));

  mutations$ = this.actions$.pipe(
    filter(
      (action: Action) =>
        action.type === WorkoutsActions.createWorkout({} as any).type ||
        action.type === WorkoutsActions.updateWorkout({} as any).type ||
        action.type === WorkoutsActions.deleteWorkout({} as any).type
    )
  );

  constructor(private store: Store, private actions$: ActionsSubject) {}

  selectWorkout(selectedId: string) {
    this.dispatch(WorkoutsActions.selectWorkout({ selectedId }));
  }

  loadWorkouts() {
    this.dispatch(WorkoutsActions.loadWorkouts());
  }

  loadWorkout(workoutId: string) {
    this.dispatch(WorkoutsActions.loadWorkout({ workoutId }));
  }

  createWorkout(workout: Workout) {
    // We are generate the UUID at the client because of a sqlite limitation
    this.dispatch(
      WorkoutsActions.createWorkout({
        workout: Object.assign({}, workout, { id: uuidv4() }),
      })
    );
  }

  updateWorkout(workout: Workout) {
    this.dispatch(WorkoutsActions.updateWorkout({ workout }));
  }

  deleteWorkout(workout: Workout) {
    this.dispatch(WorkoutsActions.deleteWorkout({ workout }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
