import { InfinityScrollLoaderDirective } from './infinity-scroll-loader.directive';
import { Friend } from '../class/friends';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

const mockFriends: Friend[] = [
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
          (drawing)="drawing()"
        >
          <div class="row" *ngFor="let friend of contents"></div>
        </div>
      `,
  styles: [
    `
          .row {
            width: 100px;
            height: 100px;
          }
        `
  ]
})
class TestComponent {
  public contents = mockFriends;
  @ViewChild(InfinityScrollLoaderDirective, { static: true }) directive: InfinityScrollLoaderDirective;
  drawing() {}
}

export function _document(): any {
  return document;
}

describe('InfinityScrollLoaderDirective', () => {
  describe('On scroll', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let deb: DebugElement;
    let directive;

    beforeEach(async () => {
      TestBed.configureTestingModule({
        declarations: [TestComponent, InfinityScrollLoaderDirective]
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      deb = fixture.debugElement.query(
        By.directive(InfinityScrollLoaderDirective)
      );
    });

    it('should create an instance', () => {
      directive = new InfinityScrollLoaderDirective(fixture, _document());
      expect(directive).toBeTruthy();
    });
  });
});
