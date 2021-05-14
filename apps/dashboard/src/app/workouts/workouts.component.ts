import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from '@bba/api-interfaces';
import { WorkoutsFacade } from '@bba/core-state';

@Component({
  selector: 'bba-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss'],
})
export class WorkoutsComponent implements OnInit {
  workouts$: Observable<Workout[]> = this.workoutsFacade.allWorkouts$;
  selectedWorkout$: Observable<Workout> = this.workoutsFacade.selectedWorkout$;

  constructor(private workoutsFacade: WorkoutsFacade) {}

  ngOnInit(): void {
    this.reset();
    this.workoutsFacade.mutations$.subscribe((_) => this.reset());
  }

  reset() {
    this.loadWorkouts();
    this.workoutsFacade.selectWorkout(null);
  }

  resetForm() {
    this.workoutsFacade.selectWorkout(null);
  }

  selectWorkout(workout: Workout) {
    this.workoutsFacade.selectWorkout(workout.id);
  }

  loadWorkouts() {
    this.workoutsFacade.loadWorkouts();
  }

  saveWorkout(workout: Workout) {
    if (workout.id) {
      this.workoutsFacade.updateWorkout(workout);
    } else {
      this.workoutsFacade.createWorkout(workout);
    }
  }

  deleteWorkout(workout: Workout) {
    this.workoutsFacade.deleteWorkout(workout);
  }
}
