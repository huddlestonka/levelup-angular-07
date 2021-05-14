import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Workout, Movement } from '@bba/api-interfaces';

@Component({
  selector: 'bba-movement-details',
  templateUrl: './movement-details.component.html',
  styleUrls: ['./movement-details.component.scss'],
})
export class MovementDetailsComponent {
  currentMovement: Movement;
  originalTitle = '';
  @Input() workouts: Workout[];
  @Input() set movement(value: Movement) {
    if (value) this.originalTitle = value.title;
    this.currentMovement = { ...value };
  }
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
}
