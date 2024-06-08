import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @ContentChild('header', { read: TemplateRef, static: true })
  protected readonly headerTpl?: TemplateRef<unknown>;

  @ContentChild('body', { read: TemplateRef, static: true })
  protected readonly bodyTpl?: TemplateRef<unknown>;

  @ContentChild('footer', { read: TemplateRef, static: true })
  protected readonly footerTpl?: TemplateRef<unknown>;
}
