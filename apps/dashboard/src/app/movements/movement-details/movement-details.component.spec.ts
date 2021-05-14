import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Movement } from '@bba/api-interfaces';
import { MaterialModule } from '@bba/material';
import { MovementDetailsComponent } from './movement-details.component';
import { mockMovement } from '@bba/testing';

describe('MovementDetailsComponent', () => {
  let component: MovementDetailsComponent;
  let fixture: ComponentFixture<MovementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovementDetailsComponent],
      imports: [FormsModule, MaterialModule, NoopAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementDetailsComponent);
    component = fixture.componentInstance;
    component.movement = mockMovement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
