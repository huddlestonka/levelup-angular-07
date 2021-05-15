import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

export enum SidenavStatus {
  OPENED = 'opened',
  DISABLED = 'disabled',
  CLOSED = 'closed',
}

@Component({
  selector: 'bba-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Workout Dashboard';
  links = [
    { path: '/', icon: 'home', title: 'home' },
    { path: '/workouts', icon: 'view_list', title: 'workouts' },
    { path: '/movements', icon: 'assignment', title: 'movements' },
  ];

  isAuthenticated$: Observable<boolean> = of(true);
  sidenavStatus = SidenavStatus.OPENED;

  constructor() {}

  toggleSidenav() {
    this.sidenavStatus =
      this.sidenavStatus === SidenavStatus.OPENED
        ? SidenavStatus.CLOSED
        : SidenavStatus.OPENED;
  }
}
