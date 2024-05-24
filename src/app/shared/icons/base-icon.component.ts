import { Directive, HostBinding, Input } from '@angular/core';

@Directive()
export abstract class BaseIconComponent {
  @HostBinding('class') protected class: string = this.getUniqueCssClass();

  @Input() public cssClass: string = 'size-6';

  protected abstract getUniqueCssClass(): string;
}
