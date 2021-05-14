import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot, cold } from '@nrwl/angular/testing';

import { Observable } from 'rxjs';

import { WorkoutsEffects } from './workouts.effects';
import * as WorkoutsActions from './workouts.actions';
import { WorkoutsService } from '@bba/core-data';

import { mockWorkoutsService, mockWorkout } from '@bba/testing';
import { Workout } from '@bba/api-interfaces';

describe('WorkoutsEffects', () => {
  let actions: Observable<any>;
  let effects: WorkoutsEffects;
  let service: WorkoutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        WorkoutsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        { provide: WorkoutsService, useValue: mockWorkoutsService },
      ],
    });

    effects = TestBed.inject(WorkoutsEffects);
    service = TestBed.inject(WorkoutsService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadWorkouts$', () => {
    it('should return loadWorkoutsSuccess, on success', () => {
      const workouts: Workout[] = [];
      const action = WorkoutsActions.loadWorkouts();
      const outcome = WorkoutsActions.loadWorkoutsSuccess({ workouts });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: workouts });
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadWorkouts$).toBeObservable(expected);
    });

    it('should return loadWorkoutsFailure, on failure', () => {
      const action = WorkoutsActions.loadWorkouts();
      const error = new Error();
      const outcome = WorkoutsActions.loadWorkoutsFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.all = jest.fn(() => response);

      expect(effects.loadWorkouts$).toBeObservable(expected);
    });
  });

  describe('loadWorkout$', () => {
    it('should return success with workout', () => {
      const workout = { ...mockWorkout };
      const action = WorkoutsActions.loadWorkout({ workoutId: workout.id });
      const outcome = WorkoutsActions.loadWorkoutSuccess({ workout });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: workout });
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadWorkout$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const workout = { ...mockWorkout };
      const action = WorkoutsActions.loadWorkout({ workoutId: workout.id });
      const error = new Error();
      const outcome = WorkoutsActions.loadWorkoutFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.find = jest.fn(() => response);

      expect(effects.loadWorkout$).toBeObservable(expected);
    });
  });

  describe('createWorkout$', () => {
    it('should return success with workout', () => {
      const workout = { ...mockWorkout };
      const action = WorkoutsActions.createWorkout({ workout });
      const outcome = WorkoutsActions.createWorkoutSuccess({ workout });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: workout });
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createWorkout$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const workout = { ...mockWorkout };
      const action = WorkoutsActions.createWorkout({ workout });
      const error = new Error();
      const outcome = WorkoutsActions.createWorkoutFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.create = jest.fn(() => response);

      expect(effects.createWorkout$).toBeObservable(expected);
    });
  });

  describe('updateWorkout$', () => {
    it('should return success with workout', () => {
      const workout = { ...mockWorkout };
      const action = WorkoutsActions.updateWorkout({ workout });
      const outcome = WorkoutsActions.updateWorkoutSuccess({ workout });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: workout });
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateWorkout$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const workout = { ...mockWorkout };
      const action = WorkoutsActions.updateWorkout({ workout });
      const error = new Error();
      const outcome = WorkoutsActions.updateWorkoutFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.update = jest.fn(() => response);

      expect(effects.updateWorkout$).toBeObservable(expected);
    });
  });

  describe('deleteWorkout$', () => {
    it('should return success with workout', () => {
      const workout = { ...mockWorkout };
      const action = WorkoutsActions.deleteWorkout({ workout });
      const outcome = WorkoutsActions.deleteWorkoutSuccess({ workout });

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: workout });
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteWorkout$).toBeObservable(expected);
    });

    it('should return failure', () => {
      const workout = { ...mockWorkout };
      const action = WorkoutsActions.deleteWorkout({ workout });
      const error = new Error();
      const outcome = WorkoutsActions.deleteWorkoutFailure({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: outcome });
      service.delete = jest.fn(() => response);

      expect(effects.deleteWorkout$).toBeObservable(expected);
    });
  });
});
