import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movement } from '@bba/api-interfaces';

@Component({
  selector: 'bba-movements-list',
  templateUrl: './movements-list.component.html',
  styleUrls: ['./movements-list.component.scss'],
})
export class MovementsListComponent {
  @Input() movements: Movement[];
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
