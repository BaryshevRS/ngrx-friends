import {InfinityScrollLoaderDirective} from './infinity-scroll-loader.directive';
import {DOCUMENT} from '@angular/common';
import {Friend} from '../class/friends';
import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

const moskFriends: Friend[] = [
    new Friend('1', 'first_name', 'last_name'),
    new Friend('2', 'first_name', 'last_name'),
    new Friend('3', 'first_name', 'last_name'),
    new Friend('4', 'first_name', 'last_name'),
    new Friend('5', 'first_name', 'last_name'),
    new Friend('6', 'first_name', 'last_name'),
    new Friend('7', 'first_name', 'last_name'),
    new Friend('8', 'first_name', 'last_name'),
    new Friend('9', 'first_name', 'last_name'),
    new Friend('10', 'first_name', 'last_name'),
    new Friend('11', 'first_name', 'last_name'),
    new Friend('12', 'first_name', 'last_name')
];

@Component({
    template: `
      <div
           appInfinityScrollLoader
           [contents]="contents"
           (drawing)="drawing($event)">
      </div>
    `
})
class TestComponent {

    public contents = moskFriends;

    @ViewChild('InfinityScrollLoaderDirective') directive: InfinityScrollLoaderDirective;

    drawing($event) {
    }
}

describe('InfinityScrollLoaderDirective', () => {

    let fixture: ComponentFixture<TestComponent>;
    let des: DebugElement;
    let directive;

    beforeEach(async(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [InfinityScrollLoaderDirective, TestComponent],
        }).createComponent(TestComponent);

        des = fixture.debugElement.query(By.directive(InfinityScrollLoaderDirective));
        directive = new InfinityScrollLoaderDirective(fixture, DOCUMENT);
        fixture.detectChanges();


    }));

    afterEach(() => {
        fixture = null;
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should create an instance 2', async() => {
        fixture.detectChanges();

        // const spy = spyOn(directive, 'ngAfterViewInit');
        // expect(spy).toHaveBeenCalled();
    });

    // dispatchSpy = spyOn(store, 'dispatch');
    // const componentDebug = fixture.debugElement;
    // const slider = componentDebug.queryAll(By.directive(MatSlideToggle))[2];
    //
    // slider.triggerEventHandler('change', { checked: false });
    // fixture.detectChanges();
    //
    // expect(dispatchSpy).toHaveBeenCalledTimes(1);
    // expect(dispatchSpy).toHaveBeenCalledWith(
    //     new ActionSettingsChangeAnimationsPage({ pageAnimations: false })
    // );

});
