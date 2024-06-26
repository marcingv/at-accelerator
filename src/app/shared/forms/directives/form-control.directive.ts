import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appFormControl]',
  standalone: true,
})
export class FormControlDirective {
  @HostBinding('class') cssClass: string = 'app-form-control';
}
