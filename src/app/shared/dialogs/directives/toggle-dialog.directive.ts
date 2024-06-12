import { Directive, HostListener, Input } from '@angular/core';
import { DialogComponent } from '../components/dialog/dialog.component';

@Directive({
  selector: '[appToggleDialog]',
  standalone: true,
})
export class ToggleDialogDirective {
  @Input({ required: true }) public appToggleDialog!: DialogComponent;

  @HostListener('click', ['$event'])
  private onClick($event?: MouseEvent): void {
    $event?.preventDefault();

    this.appToggleDialog.toggle();
  }
}
