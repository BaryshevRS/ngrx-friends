import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from '../../store/reducer';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducer, {}), RouterTestingModule],
      declarations: [HeaderComponent, HeaderSearchComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Logo name is Friends', () => {
    const el = fixture.debugElement.nativeElement;
    const title = el.querySelector('.navbar-brand').textContent;
    expect(title).toEqual('Friends');
  });

  it('should create', () => {
    const el = fixture.debugElement.componentInstance;
    expect(el).toBeTruthy();
  });
});
