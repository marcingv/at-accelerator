import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseIconComponent } from '../base-icon.component';

@Component({
  selector: 'app-bookmark-icon',
  standalone: true,
  imports: [],
  templateUrl: './bookmark-icon.component.html',
  styleUrl: './bookmark-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkIconComponent extends BaseIconComponent {
  protected override getUniqueCssClass(): string {
    return 'icon-bookmark';
  }
}
