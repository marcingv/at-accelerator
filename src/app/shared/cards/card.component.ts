import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
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
  protected headerTpl = contentChild('header', { read: TemplateRef });
  protected bodyTpl = contentChild('body', { read: TemplateRef });
  protected footerTpl = contentChild('footer', { read: TemplateRef });
}
