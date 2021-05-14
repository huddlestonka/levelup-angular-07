import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Workout } from '@bba/api-interfaces';

@Component({
  selector: 'bba-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss'],
})
export class WorkoutsListComponent {
  @Input() workouts: Workout[];
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
