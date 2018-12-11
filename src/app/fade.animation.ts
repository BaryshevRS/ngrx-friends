import { animate, style, transition, trigger } from '@angular/animations';

// todo разобраться, как отслеживать анимацию со стором

export const fadeStateTrigger = trigger('fade', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(400)
    ]),
    transition(':leave', animate(400, style({
        opacity: 0
    })))
]);
