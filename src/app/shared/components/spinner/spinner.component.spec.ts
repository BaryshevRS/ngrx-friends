import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from '../../../store/reducer';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducer, {})],
      declarations: [SpinnerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
