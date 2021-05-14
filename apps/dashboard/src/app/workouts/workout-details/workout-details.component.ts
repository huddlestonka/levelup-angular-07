import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Workout } from '@bba/api-interfaces';

@Component({
  selector: 'bba-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.scss'],
})
export class WorkoutDetailsComponent {
  currentWorkout: Workout;
  originalTitle = '';
  @Input() set workout(value: Workout) {
    if (value) this.originalTitle = value.title;
    this.currentWorkout = { ...value };
  }
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
}
