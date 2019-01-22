import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HeaderComponent} from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    //.compileComponents();
  }));

/*  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/
/*
      it('isset h1', () => {
          let fixture = TestBed.createComponent(HeaderComponent);
          fixture.detectChanges();
          const component = fixture.debugElement.nativeElement;
          expect(component.querySelector('.navbar-brand').textContent).toEqual('Friends ');
      });*/

/*  it('should create', () => {
      let fixture = TestBed.createComponent(HeaderComponent);
      const component = fixture.debugElement.componentInstance;
      expect(component).toBeTruthy();
  });*/
});
