import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@bba/material';
import { MovementsListComponent } from './movements-list.component';

describe('MovementsListComponent', () => {
  let component: MovementsListComponent;
  let fixture: ComponentFixture<MovementsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovementsListComponent],
      imports: [MaterialModule, NoopAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
