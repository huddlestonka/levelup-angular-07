import * as WorkoutsActions from './workouts.actions';
import {
  WorkoutsState,
  initialWorkoutsState,
  workoutsReducer,
} from './workouts.reducer';
import { mockWorkout, mockEmptyWorkout } from '@bba/testing';

describe('Workouts Reducer', () => {
  let workouts;

  beforeEach(() => {
    workouts = [
      { ...mockWorkout, id: '0' },
      { ...mockWorkout, id: '1' },
      { ...mockWorkout, id: '2' },
    ];
  });

  describe('valid Workouts actions', () => {
    it('loadWorkouts should set loaded to false', () => {
      const action = WorkoutsActions.loadWorkouts();
      const expectedState = {
        ...initialWorkoutsState,
        error: null,
      };

      const result: WorkoutsState = workoutsReducer(
        initialWorkoutsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadWorkoutsSuccess should set the list of known Workouts', () => {
      const action = WorkoutsActions.loadWorkoutsSuccess({ workouts });
      const expectedState = {
        ...initialWorkoutsState,
        loaded: true,
        entities: {
          0: workouts[0],
          1: workouts[1],
          2: workouts[2],
        },
        ids: workouts.map((workout) => workout.id),
      };

      const result: WorkoutsState = workoutsReducer(
        initialWorkoutsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadWorkoutsFailure should set error to error', () => {
      const error = new Error();
      const action = WorkoutsActions.loadWorkoutsFailure({ error });
      const expectedState = {
        ...initialWorkoutsState,
        error,
      };

      const result: WorkoutsState = workoutsReducer(
        initialWorkoutsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadWorkout should set loaded to false', () => {
      const action = WorkoutsActions.loadWorkout({ workoutId: mockWorkout.id });
      const expectedState = {
        ...initialWorkoutsState,
        loaded: false,
        error: null,
      };

      const result: WorkoutsState = workoutsReducer(
        initialWorkoutsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadWorkoutSuccess should set loaded to true', () => {
      const action = WorkoutsActions.loadWorkoutSuccess({
        workout: mockWorkout,
      });
      const expectedState = {
        ...initialWorkoutsState,
        loaded: true,
        entities: {
          0: mockWorkout,
        },
        ids: [mockWorkout.id],
      };

      const result: WorkoutsState = workoutsReducer(
        initialWorkoutsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('loadWorkoutFailure should set error to error', () => {
      const error = new Error();
      const action = WorkoutsActions.loadWorkoutFailure({ error });
      const expectedState = {
        ...initialWorkoutsState,
        error,
      };

      const result: WorkoutsState = workoutsReducer(
        initialWorkoutsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('updateWorkoutSuccess should modify workout', () => {
      const prepAction = WorkoutsActions.loadWorkoutSuccess({
        workout: { ...mockEmptyWorkout, id: mockWorkout.id },
      });
      const prepState: WorkoutsState = workoutsReducer(
        initialWorkoutsState,
        prepAction
      );

      const expectedState = {
        ...initialWorkoutsState,
        loaded: true,
        entities: {
          0: mockWorkout,
        },
        ids: [mockWorkout.id],
      };

      const action = WorkoutsActions.updateWorkoutSuccess({
        workout: mockWorkout,
      });
      const result: WorkoutsState = workoutsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('updateWorkoutFailure should set error to error', () => {
      const error = new Error();
      const action = WorkoutsActions.updateWorkoutFailure({ error });
      const expectedState = {
        ...initialWorkoutsState,
        error,
      };

      const result: WorkoutsState = workoutsReducer(
        initialWorkoutsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('createWorkoutSuccess should add workout', () => {
      const action = WorkoutsActions.createWorkoutSuccess({
        workout: mockWorkout,
      });
      const expectedState = {
        ...initialWorkoutsState,
        loaded: false,
        entities: {
          0: mockWorkout,
        },
        ids: [mockWorkout.id],
      };

      const result: WorkoutsState = workoutsReducer(
        initialWorkoutsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('createWorkoutFailure should set error to error', () => {
      const error = new Error();
      const action = WorkoutsActions.createWorkoutFailure({ error });
      const expectedState = {
        ...initialWorkoutsState,
        error,
      };

      const result: WorkoutsState = workoutsReducer(
        initialWorkoutsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteWorkoutSuccess should add workout', () => {
      const prepAction = WorkoutsActions.loadWorkoutSuccess({
        workout: mockWorkout,
      });
      const prepState: WorkoutsState = workoutsReducer(
        initialWorkoutsState,
        prepAction
      );

      const expectedState = {
        ...initialWorkoutsState,
        loaded: true,
      };

      const action = WorkoutsActions.deleteWorkoutSuccess({
        workout: mockWorkout,
      });
      const result: WorkoutsState = workoutsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('deleteWorkoutFailure should set error to error', () => {
      const error = new Error();
      const action = WorkoutsActions.deleteWorkoutFailure({ error });
      const expectedState = {
        ...initialWorkoutsState,
        error,
      };

      const result: WorkoutsState = workoutsReducer(
        initialWorkoutsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('selectWorkout should set selectedId', () => {
      const action = WorkoutsActions.selectWorkout({
        selectedId: mockWorkout.id,
      });
      const expectedState = {
        ...initialWorkoutsState,
        selectedId: mockWorkout.id,
      };

      const result: WorkoutsState = workoutsReducer(
        initialWorkoutsState,
        action
      );

      expect(result).toStrictEqual(expectedState);
    });

    it('resetSelectedWorkout should reset selectedId', () => {
      const prepAction = WorkoutsActions.selectWorkout({
        selectedId: mockWorkout.id,
      });
      const prepState = workoutsReducer(initialWorkoutsState, prepAction);

      const action = WorkoutsActions.resetSelectedWorkout();
      const expectedState = {
        ...initialWorkoutsState,
        selectedId: null,
      };

      const result: WorkoutsState = workoutsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });

    it('resetWorkouts should reset workouts', () => {
      const prepAction = WorkoutsActions.loadWorkoutsSuccess({ workouts });
      const prepState: WorkoutsState = workoutsReducer(
        initialWorkoutsState,
        prepAction
      );

      const expectedState = {
        ...initialWorkoutsState,
        loaded: true,
      };

      const action = WorkoutsActions.resetWorkouts();
      const result: WorkoutsState = workoutsReducer(prepState, action);

      expect(result).toStrictEqual(expectedState);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result: WorkoutsState = workoutsReducer(
        initialWorkoutsState,
        action
      );

      expect(result).toBe(initialWorkoutsState);
    });
  });
});
