import {InfinityScrollLoaderDirective} from './infinity-scroll-loader.directive';
import {DOCUMENT} from '@angular/common';
import {Friend} from '../class/friends';
import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed, async, tick, fakeAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

describe('InfinityScrollLoaderDirective', () => {

    describe('On scroll', () => {

        const moskFriends: Friend[] = [
            new Friend('1', 'first_name', 'last_name'),
            new Friend('2', 'first_name', 'last_name'),
            new Friend('3', 'first_name', 'last_name'),
            new Friend('4', 'first_name', 'last_name'),
            new Friend('5', 'first_name', 'last_name'),
            new Friend('6', 'first_name', 'last_name'),
            new Friend('7', 'first_name', 'last_name'),
            new Friend('8', 'first_name', 'last_name')
        ];

        @Component({
            template: `
              <div
                  appInfinityScrollLoader
                  [contents]="contents"
                  (drawing)="drawing($event)">
                <div class="row"
                     *ngFor="let friend of contents;">
                </div>
              </div>
            `,
            styles: [`
                .row {
                    width: 100px;
                    height: 100px;
                }
            `]
        })
        class TestComponent {

            public contents = moskFriends;

            @ViewChild(InfinityScrollLoaderDirective, { static: true }) directive: InfinityScrollLoaderDirective;

            drawing($event) {
            }
        }

        let component: TestComponent;
        let fixture: ComponentFixture<TestComponent>;
        let des: DebugElement;
        let directive;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent, InfinityScrollLoaderDirective]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            des = fixture.debugElement.query(By.directive(InfinityScrollLoaderDirective));
        });

        afterEach(() => {
            fixture = null;
        });

        it('should create an instance', () => {
            directive = new InfinityScrollLoaderDirective(fixture, DOCUMENT);
            expect(directive).toBeTruthy();
        });

        it('should create drawing',  fakeAsync(() => {

            fixture.whenStable().then(() => {
                const drawingSpy = spyOn(component, 'drawing');

                window.scrollTo(0, 100);
                window.dispatchEvent(new Event('scroll'));

                tick(1000);

                fixture.detectChanges();

                window.scrollTo(0, 200);
                window.dispatchEvent(new Event('scroll'));
                tick(1000);

                expect(drawingSpy).toHaveBeenCalled();
            });

        }));
    });

    describe('fill on load', () => {

        const moskFriends: Friend[] = [
            new Friend('1', 'first_name', 'last_name'),
            new Friend('2', 'first_name', 'last_name'),
            new Friend('3', 'first_name', 'last_name'),
            new Friend('4', 'first_name', 'last_name')
        ];

        @Component({
            template: `
              <div
                  appInfinityScrollLoader
                  [contents]="contents"
                  (drawing)="drawing($event)">
                <div class="row"
                     *ngFor="let friend of contents;">
                </div>
              </div>
            `,
            styles: [`
                .row {
                    width: 100%;
                    height: 100px;
                }
            `]
        })
        class TestComponent {

            public contents = moskFriends;

            @ViewChild(InfinityScrollLoaderDirective, { static: true }) directive: InfinityScrollLoaderDirective;

            drawing($event) {
                console.log('drawing2');
            }
        }

        let component: TestComponent;
        let fixture: ComponentFixture<TestComponent>;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent, InfinityScrollLoaderDirective]
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TestComponent);
            component = fixture.componentInstance;

        });

        afterEach(() => {
            fixture = null;
        });

        it('should create ngAfterViewChecked',   (  async () => {

            fixture.whenStable().then(() => {
                const drawingSpy = spyOn(component, 'drawing');
                fixture.detectChanges();
                expect(drawingSpy).toHaveBeenCalled();

                const ngAfterViewCheckedSpy = spyOn(component.directive, 'ngAfterViewChecked');
                fixture.detectChanges();
                expect(ngAfterViewCheckedSpy).toHaveBeenCalled();
            });

        }));

    });
});
