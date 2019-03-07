import {TestBed, inject} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {LocalSaveService} from './local-save.service';

describe('LocalSaveService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LocalSaveService],
            imports: [
                HttpClientModule
            ],
        });
    });

    it('should be created', inject([LocalSaveService], (service: LocalSaveService) => {
        expect(service).toBeTruthy();
    }));
});
