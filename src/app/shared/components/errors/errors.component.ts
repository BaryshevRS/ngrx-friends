import { Component, Input } from '@angular/core';
import { ErrorMessage } from '../../../pages/friends/shared/classes/errors';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html'
})
export class ErrorsComponent {
  @Input() errors: ErrorMessage = null;

  constructor() {
  }
}
