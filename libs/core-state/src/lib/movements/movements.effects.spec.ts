import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { MovementsEffects } from './movements.effects';
import * as MovementsActions from './movements.actions';

describe('MovementsEffects', () => {
  let actions: Observable<any>;
  let effects: MovementsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        MovementsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(MovementsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: MovementsActions.init() });

      const expected = hot('-a-|', {
        a: MovementsActions.loadMovementsSuccess({ movements: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
