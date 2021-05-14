import { Component, OnInit } from '@angular/core';
import { WorkoutsFacade, MovementsFacade } from '@bba/core-state';

@Component({
  selector: 'bba-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  workoutMovements$ = this.workoutsFacade.workoutMovements$;

  constructor(
    private workoutsFacade: WorkoutsFacade,
    private movementsFacade: MovementsFacade
  ) {}

  ngOnInit(): void {
    this.workoutsFacade.loadWorkouts();
    this.movementsFacade.loadMovements();
  }
}
