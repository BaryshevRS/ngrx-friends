import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookmarkComponent} from './bookmark.component';
import {ChangeDetectionStrategy, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('BookmarkComponent', () => {
    let component: BookmarkComponent;
    let fixture: ComponentFixture<BookmarkComponent>;

    const getBookmark = () => fixture.debugElement.query(By.css('.bookmark-block'));
    const getBookmarkIcon = () => fixture.debugElement.query(By.css('.bookmark-block > i'));

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BookmarkComponent]
        })
            .overrideComponent(BookmarkComponent, {
                set: {changeDetection: ChangeDetectionStrategy.Default}
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookmarkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit action event on bookmark click', () => {
        spyOn(component, 'setValue').and.callThrough();
        getBookmark().triggerEventHandler('click', {});
        expect(component.setValue).toHaveBeenCalled();

        expect(component).toBeTruthy();
    });

    it('should bookmark show active', () => {
        component.value = 1;
        fixture.detectChanges();
        expect(getBookmarkIcon().nativeElement.classList.contains('active')).toBeTruthy();
    });

    it('should bookmark not show active', () => {
        component.value = undefined;
        fixture.detectChanges();
        expect(getBookmarkIcon().nativeElement.classList.contains('active')).toBeFalsy();
    });
});
