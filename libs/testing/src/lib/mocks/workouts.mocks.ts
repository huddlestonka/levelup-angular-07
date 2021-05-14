import { Workout } from '@bba/api-interfaces';
import { of } from 'rxjs';

export const mockWorkoutsFacade = {
  loadWorkouts: () => {},
  selectWorkout: () => {},
  deleteWorkout: () => {},
  updateWorkout: () => {},
  createWorkout: () => {},
  mutations$: of(true),
};

export const mockWorkoutsService = {
  all: () => of([]),
  find: () => of({ ...mockWorkout }),
  create: () => of({ ...mockWorkout }),
  update: () => of({ ...mockWorkout }),
  delete: () => of({ ...mockWorkout }),
};

export const mockWorkout = {
  id: '0',
  title: 'mock',
  description: 'mock',
};

export const mockEmptyWorkout = {
  id: null,
  title: 'mockEmpty',
  description: 'mockEmpty',
};
