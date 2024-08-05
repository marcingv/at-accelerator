import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseIconComponent } from '@shared/icons/base-icon.component';

@Component({
  selector: 'app-clipboard-document-list-icon',
  standalone: true,
  imports: [],
  templateUrl: './clipboard-document-list-icon.component.html',
  styleUrl: './clipboard-document-list-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipboardDocumentListIconComponent extends BaseIconComponent {
  protected override getUniqueCssClass(): string {
    return 'icon-clipboard-document-list';
  }
}
