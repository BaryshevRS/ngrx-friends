import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
/*import { Observable, of, Subject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';*/

@Component({
    selector: 'app-header-search',
    templateUrl: './header-search.component.html',
    styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit {

    public search = '';
    private form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            'search': new FormControl('' )
        });
    }

    ngOnInit() {

    /*    const keyup = this.form.get('family').valueChanges
            // .map((data:string) => data.replace(' ',''))
            // .debounceTime(400);
        keyup.subscribe(x => console.log(x));*/

/*        this.form.valueChanges
            .map((value) => {
                value.firstName = value.firstName.toUpperCase();
                return value;
            })
            .filter((value) => this.form.valid)
            .subscribe((value) => {
                console.log("Model Driven Form valid value: vm = ",
                    JSON.stringify(value));
            });*/
    }

    setSearch() {

        console.log('this.form', this.form);
    }

    resetSearch() {
        this.search = '';
    }
}
