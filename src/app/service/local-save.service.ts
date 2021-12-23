import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalSaveService {
  constructor() {
  }

  public get(name: string): object {
    let itemValue = {};

    const values = localStorage.getItem(name);

    if (values) {
      try {
        itemValue = JSON.parse(<string>values);
      } catch (e) {
      }
    }

    return itemValue;
  }

  public set(name: string, savedValue: object): object {
    const values = localStorage.getItem(name);

    if (values) {
      let itemValue = {};

      try {
        itemValue = JSON.parse(<string>values);
        localStorage.setItem(name, JSON.stringify({...itemValue, ...savedValue}));
      } catch (e) {
        localStorage.setItem(name, JSON.stringify(savedValue));
      }
    } else {
      localStorage.setItem(name, JSON.stringify(savedValue));
    }

    return savedValue;
  }
}
