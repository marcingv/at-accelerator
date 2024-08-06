import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, of, switchMap } from 'rxjs';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-form-control',
  standalone: true,
  imports: [NgClass, JsonPipe],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlComponent {
  public label = input<string>();

  protected ngControl = contentChild(NgControl);

  private control$ = toObservable(this.ngControl);
  private cssClasses$ = this.control$.pipe(
    switchMap((ngControl: NgControl | undefined) => {
      if (!ngControl || !ngControl.control) {
        return of({});
      }

      return ngControl.control.events.pipe(
        map(() => ({
          invalid: ngControl.dirty && ngControl.invalid,
        })),
      );
    }),
  );

  protected cssClasses = toSignal(this.cssClasses$);

  protected errors$ = this.control$.pipe(
    switchMap((control) => {
      if (!control || !control.statusChanges) {
        return of(null);
      }

      return control.statusChanges.pipe(map(() => control.errors));
    }),
  );

  protected errors = toSignal(this.errors$);
}
