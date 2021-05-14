import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { CoreDataModule } from '@bba/core-data';
import { CoreStateModule, WorkoutsFacade } from '@bba/core-state';
import { MaterialModule } from '@bba/material';

import { WorkoutDetailsComponent } from './workout-details/workout-details.component';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';
import { WorkoutsComponent } from './workouts.component';

import { mockWorkout, mockEmptyWorkout } from '@bba/testing';

describe('WorkoutsComponent', () => {
  let component: WorkoutsComponent;
  let fixture: ComponentFixture<WorkoutsComponent>;
  let de: DebugElement;
  let workoutsFacade: WorkoutsFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WorkoutsComponent,
        WorkoutDetailsComponent,
        WorkoutsListComponent,
      ],
      imports: [
        CoreDataModule,
        CoreStateModule,
        FormsModule,
        MaterialModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    workoutsFacade = TestBed.inject(WorkoutsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on select call workoutsFacade selectWorkout', () => {
    const spy = jest.spyOn(workoutsFacade, 'selectWorkout');

    component.selectWorkout(mockWorkout);

    expect(spy).toHaveBeenCalledWith(mockWorkout.id);
  });

  describe('should on save call workoutsFacade', () => {
    it('updateWorkout', () => {
      const spy = jest.spyOn(workoutsFacade, 'updateWorkout');

      component.saveWorkout(mockWorkout);

      expect(spy).toHaveBeenCalledWith(mockWorkout);
    });

    it('createWorkout', () => {
      const spy = jest.spyOn(workoutsFacade, 'createWorkout');

      component.saveWorkout(mockEmptyWorkout);

      expect(spy).toHaveBeenCalledWith(mockEmptyWorkout);
    });
  });

  it('should on delete call workoutsFacade deleteWorkout', () => {
    const spy = jest.spyOn(workoutsFacade, 'deleteWorkout');

    component.deleteWorkout(mockWorkout);

    expect(spy).toHaveBeenCalledWith(mockWorkout);
  });
});
