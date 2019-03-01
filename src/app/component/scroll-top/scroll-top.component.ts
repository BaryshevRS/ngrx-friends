import {Component, ElementRef, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent implements OnInit {

  constructor(private el: ElementRef) { }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
        const max = document.documentElement.scrollHeight;
        const height = this.el.nativeElement.offsetHeight;
        // const scrolled = this.el.nativeElement.scrollTop;
        // console.log('scrolled', scrolled);
        console.log('height', height);
        console.log(pos + '===' + max);
        if (pos === max )   {
            // action here
        }
    }

  ngOnInit() {
  }

}
