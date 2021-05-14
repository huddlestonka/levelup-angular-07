import { Component, OnInit } from '@angular/core';
import { Workout, Movement } from '@bba/api-interfaces';
import { WorkoutsFacade, MovementsFacade } from '@bba/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'bba-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss'],
})
export class MovementsComponent implements OnInit {
  workouts$: Observable<Workout[]> = this.workoutsFacade.allWorkouts$;
  movements$: Observable<Movement[]> = this.movementsFacade.allMovements$;
  selectedMovement$: Observable<Movement> = this.movementsFacade
    .selectedMovement$;

  constructor(
    private movementsFacade: MovementsFacade,
    private workoutsFacade: WorkoutsFacade
  ) {}

  ngOnInit(): void {
    this.reset();
    this.movementsFacade.mutations$.subscribe((_) => this.reset());
  }

  reset() {
    this.loadMovements();
    this.loadWorkouts();
    this.movementsFacade.selectMovement(null);
  }

  resetForm() {
    this.movementsFacade.selectMovement(null);
  }

  loadMovements() {
    this.movementsFacade.loadMovements();
  }

  loadWorkouts() {
    this.workoutsFacade.loadWorkouts();
  }

  selectMovement(movement: Movement) {
    this.movementsFacade.selectMovement(movement.id);
  }

  saveMovement(movement: Movement) {
    if (movement.id) {
      this.movementsFacade.updateMovement(movement);
    } else {
      this.movementsFacade.createMovement(movement);
    }
  }

  deleteMovement(movement: Movement) {
    this.movementsFacade.deleteMovement(movement);
  }
}
