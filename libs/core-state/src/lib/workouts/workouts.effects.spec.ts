import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { WorkoutsEffects } from './workouts.effects';
import * as WorkoutsActions from './workouts.actions';

describe('WorkoutsEffects', () => {
  let actions: Observable<any>;
  let effects: WorkoutsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        WorkoutsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(WorkoutsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: WorkoutsActions.init() });

      const expected = hot('-a-|', {
        a: WorkoutsActions.loadWorkoutsSuccess({ workouts: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
