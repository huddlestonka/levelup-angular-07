import { TestBed } from '@angular/core/testing';
import { ActionsSubject } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { WorkoutsFacade } from './workouts.facade';
import * as WorkoutsActions from './workouts.actions';
import { initialWorkoutsState } from './workouts.reducer';

import { mockWorkout } from '@bba/testing';

describe('WorkoutsFacade', () => {
  let facade: WorkoutsFacade;
  let actionSubject;
  const mockActionsSubject = new ActionsSubject();
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkoutsFacade,
        provideMockStore({ initialState: initialWorkoutsState }),
        { provide: ActionsSubject, useValue: mockActionsSubject },
      ],
    });

    facade = TestBed.inject(WorkoutsFacade);
    actionSubject = TestBed.inject(ActionsSubject);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should have mutations', (done) => {
    const action = WorkoutsActions.createWorkout({ workout: mockWorkout });
    actionSubject.next(action);

    facade.mutations$.subscribe((result) => {
      expect(result).toBe(action);
      done();
    });
  });

  describe('should dispatch', () => {
    it('select on select(workout.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.selectWorkout(mockWorkout.id);

      const action = WorkoutsActions.selectWorkout({
        selectedId: mockWorkout.id,
      });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadWorkouts on loadWorkouts()', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadWorkouts();

      const action = WorkoutsActions.loadWorkouts();

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('loadWorkout on loadWorkout(workout.id)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.loadWorkout(mockWorkout.id);

      const action = WorkoutsActions.loadWorkout({ workoutId: mockWorkout.id });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('createWorkout on createWorkout(workout)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.createWorkout(mockWorkout);

      const action = WorkoutsActions.createWorkout({ workout: mockWorkout });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('updateWorkout on updateWorkout(workout)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.updateWorkout(mockWorkout);

      const action = WorkoutsActions.updateWorkout({ workout: mockWorkout });

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('delete on delete(model)', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.deleteWorkout(mockWorkout);

      const action = WorkoutsActions.deleteWorkout({ workout: mockWorkout });

      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
