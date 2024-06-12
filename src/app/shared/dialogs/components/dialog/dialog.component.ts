import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CardComponent } from '@shared/cards';
import { CloseIconComponent } from '@shared/icons/close-icon';
import { ButtonDirective } from '@shared/buttons/directives';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CardComponent,
    CloseIconComponent,
    ButtonDirective,
    NgTemplateOutlet,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'dialog',
})
export class DialogComponent implements OnInit {
  @ViewChild('dialog', { static: true })
  private dialogEl!: ElementRef<HTMLDialogElement>;
  private dialog!: HTMLDialogElement;

  @Input() public dialogTitle?: string;
  @Output() public closed: EventEmitter<void> = new EventEmitter<void>();

  @ContentChild('header', { read: TemplateRef, static: true })
  protected readonly headerTpl?: TemplateRef<unknown>;

  @ContentChild('body', { read: TemplateRef, static: true })
  protected readonly bodyTpl?: TemplateRef<unknown>;

  @ContentChild('footer', { read: TemplateRef, static: true })
  protected readonly footerTpl?: TemplateRef<unknown>;

  public ngOnInit(): void {
    this.dialog = this.dialogEl.nativeElement;
    this.dialog.onclose = (): void => {
      this.closed.next();
    };
  }

  public toggle(): void {
    this.isOpened() ? this.close() : this.showModal();
  }

  public showModal(): void {
    this.dialog.showModal();
  }

  public close(): void {
    this.dialog.close();
  }

  public isOpened(): boolean {
    return this.dialog.open;
  }
}
