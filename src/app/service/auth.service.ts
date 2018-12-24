import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    ifAuth = false;

    constructor() {}

    idAuth() {
        return this.ifAuth;
    }

    logIn() {
        this.ifAuth = true;
    }

    logOut() {
        this.ifAuth = false;
    }
}
