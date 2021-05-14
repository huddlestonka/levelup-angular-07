import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { CoreDataModule } from '@bba/core-data';
import { CoreStateModule, MovementsFacade } from '@bba/core-state';
import { MaterialModule } from '@bba/material';

import { MovementDetailsComponent } from './movement-details/movement-details.component';
import { MovementsListComponent } from './movements-list/movements-list.component';
import { MovementsComponent } from './movements.component';

import { mockMovement, mockEmptyMovement } from '@bba/testing';

describe('MovementsComponent', () => {
  let component: MovementsComponent;
  let fixture: ComponentFixture<MovementsComponent>;
  let de: DebugElement;
  let movementsFacade: MovementsFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MovementsComponent,
        MovementDetailsComponent,
        MovementsListComponent,
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
    fixture = TestBed.createComponent(MovementsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    movementsFacade = TestBed.inject(MovementsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on select call movementsFacade selectMovement', () => {
    const spy = jest.spyOn(movementsFacade, 'selectMovement');

    component.selectMovement(mockMovement);

    expect(spy).toHaveBeenCalledWith(mockMovement.id);
  });

  describe('should on save call movementsFacade', () => {
    it('updateMovement', () => {
      const spy = jest.spyOn(movementsFacade, 'updateMovement');

      component.saveMovement(mockMovement);

      expect(spy).toHaveBeenCalledWith(mockMovement);
    });

    it('createMovement', () => {
      const spy = jest.spyOn(movementsFacade, 'createMovement');

      component.saveMovement(mockEmptyMovement);

      expect(spy).toHaveBeenCalledWith(mockEmptyMovement);
    });
  });

  it('should on delete call movementsFacade deleteMovement', () => {
    const spy = jest.spyOn(movementsFacade, 'deleteMovement');

    component.deleteMovement(mockMovement);

    expect(spy).toHaveBeenCalledWith(mockMovement);
  });
});
