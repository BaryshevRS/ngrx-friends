import {InfinityScrollLoaderDirective} from './infinity-scroll-loader.directive';
import {DOCUMENT} from '@angular/common';

describe('InfinityScrollLoaderDirective', () => {
    it('should create an instance', () => {
        const directive = new InfinityScrollLoaderDirective(null, DOCUMENT);
        expect(directive).toBeTruthy();
    });
});
