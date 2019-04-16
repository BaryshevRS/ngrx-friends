import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderSearchComponent} from './header-search.component';
import {By} from '@angular/platform-browser';
import {ChangeDetectionStrategy, DebugElement} from '@angular/core';

describe('HeaderSearchComponent', () => {
    let component: HeaderSearchComponent;
    let fixture: ComponentFixture<HeaderSearchComponent>;

    const getSearchInput = () => fixture.debugElement.query(By.css('.search-box'));

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderSearchComponent]
        })
            // .overrideComponent(BookmarkComponent, {
            //     set: {changeDetection: ChangeDetectionStrategy.Default}
            // })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit action event on search input', () => {

        const expectedEventData = 'test';

        spyOn(component, 'search').and.callThrough();
        getSearchInput().nativeElement.value = expectedEventData;
        getSearchInput().nativeElement.dispatchEvent(new Event('input'));

        expect(component.search).toHaveBeenCalled();
        expect(component.search).toHaveBeenCalledTimes(1);
        expect(component.search).toHaveBeenCalledWith(expectedEventData);

    });

    it('should display a errors after the data is loaded', () => {
        component.resetSearch();
        expect(getSearchInput().nativeElement.value).toBe('');
    });
});
