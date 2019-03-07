import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NavSortComponent} from './nav-sort.component';

describe('NavSortComponent', () => {
    let component: NavSortComponent;
    let fixture: ComponentFixture<NavSortComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ NavSortComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavSortComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
