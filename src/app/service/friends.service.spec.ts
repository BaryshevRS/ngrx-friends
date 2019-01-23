import {TestBed, inject} from '@angular/core/testing';
import {FriendsService} from './friends.service';
import {HttpClientModule} from '@angular/common/http';

describe('FriendsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FriendsService],
            imports: [
                HttpClientModule
            ],
        });
    });

    it('should be created', inject([FriendsService], (service: FriendsService) => {
        expect(service).toBeTruthy();
    }));
});
