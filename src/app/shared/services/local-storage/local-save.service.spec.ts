import { inject, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LocalSaveService } from './local-save.service';

describe('LocalSaveService', () => {
  describe('Localstorage empty', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [LocalSaveService],
        imports: [HttpClientModule]
      });

      const store = {};

      spyOn(localStorage, 'getItem').and.callFake(function (
        key: string
      ): string {
        return store[key] || '';
      });

      spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
        return (store[key] = value.toString());
      });
    });

    it('should be created', inject(
      [LocalSaveService],
      (service: LocalSaveService) => {
        expect(service).toBeTruthy();
      }
    ));

    it('should be set', inject(
      [LocalSaveService],
      (service: LocalSaveService) => {
        const moskName = 'friendsBookmark';
        const moskValue = { id1: 1 };

        service.set(moskName, moskValue);

        expect(localStorage.getItem).toHaveBeenCalled();
        expect(localStorage.getItem).toHaveBeenCalledWith(moskName);
        expect(localStorage.setItem).toHaveBeenCalledWith(
          moskName,
          JSON.stringify(moskValue)
        );
      }
    ));

    /*    it('should be get', inject(
      [LocalSaveService],
      (service: LocalSaveService) => {
        const moskName = 'friendsBookmark';

        expect(service.get(moskName)).toBeNull();

        expect(localStorage.getItem).toHaveBeenCalled();
        expect(localStorage.getItem).toHaveBeenCalledWith(moskName);
      }
    ));*/
  });

  describe('Localstorage full', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [LocalSaveService],
        imports: [HttpClientModule]
      });

      const store = { friendsBookmark: '{"id1":1}' };

      spyOn(localStorage, 'getItem').and.callFake(function (
        key: string
      ): string {
        return store[key] || undefined;
      });

      spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
        return (store[key] = value.toString());
      });
    });

    it('should be created', inject(
      [LocalSaveService],
      (service: LocalSaveService) => {
        expect(service).toBeTruthy();
      }
    ));

    it('should be set', inject(
      [LocalSaveService],
      (service: LocalSaveService) => {
        const moskName = 'friendsBookmark';
        const moskValue = { id2: 1 };
        const moskValueReturn = { id1: 1, id2: 1 };

        service.set(moskName, moskValue);

        expect(localStorage.setItem).toHaveBeenCalledWith(
          moskName,
          JSON.stringify(moskValueReturn)
        );
      }
    ));

    it('should be get', inject(
      [LocalSaveService],
      (service: LocalSaveService) => {
        const moskName = 'friendsBookmark';
        const moskValue = { id1: 1 };

        expect({ ...service.get(moskName) }).toEqual({ ...moskValue });
        expect(localStorage.getItem).toHaveBeenCalledWith(moskName);
      }
    ));
  });
});
