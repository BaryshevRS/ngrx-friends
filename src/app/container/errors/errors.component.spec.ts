import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {Store, StoreModule} from '@ngrx/store';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

import { ErrorsComponent } from './errors.component';
import {appReducer} from '../../store/reducer';
import {ErrorMessage} from '../../class/errors';
import {HttpLoaderFactory} from '../../factory/translate-http-loader';
import {ErrorsFriends} from '../../store/action';
import {FriendsAction} from '../../store/type';

describe('ErrorsComponent', () => {
  let component: ErrorsComponent;
  let fixture: ComponentFixture<ErrorsComponent>;
  let store: Store<FriendsAction>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorsComponent ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot(appReducer, {}),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(ErrorsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a errors after the data is loaded', () => {
    const errors = new ErrorMessage('info', 'errorMessage.searchEmpty');
    const action = new ErrorsFriends(errors);

    store.dispatch(action);

    component.errors$.subscribe(data => {
      fixture.detectChanges();
      const debugElement: DebugElement = fixture.debugElement;
      const bindingElement = debugElement.query(By.css('.alert'));

      expect(bindingElement.nativeElement.classList.contains('alert-info')).toBeTruthy();
      expect({...data}).toEqual({...errors});
    });

  });

});
