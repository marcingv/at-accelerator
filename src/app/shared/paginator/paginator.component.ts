import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  model,
  ModelSignal,
  Signal,
} from '@angular/core';
import { ButtonDirective } from '@shared/buttons/directives';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, ButtonDirective],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  private readonly MAX_PAGE_BUTTONS_COUNT: number = 5;

  public totalPages: InputSignal<number> = input.required<number>();
  public currentPage: ModelSignal<number> = model.required<number>();

  protected readonly isFirstPage: Signal<boolean> = computed(
    () => this.currentPage() === 1,
  );

  protected readonly isLastPage: Signal<boolean> = computed(
    () => this.currentPage() >= this.totalPages(),
  );

  protected readonly hasPrevPage: Signal<boolean> = computed(
    () => !this.isFirstPage(),
  );

  protected readonly hasNextPage: Signal<boolean> = computed(
    () => !this.isLastPage(),
  );

  protected readonly pageButtons: Signal<number[]> = computed(() => {
    const pageButtons: number[] = [];

    let start: number =
      this.currentPage() - Math.floor(this.MAX_PAGE_BUTTONS_COUNT / 2);
    let end: number = start + this.MAX_PAGE_BUTTONS_COUNT - 1;

    if (start < 1) {
      start = 1;
      end = start + this.MAX_PAGE_BUTTONS_COUNT - 1;
    } else if (end > this.totalPages()) {
      end = this.totalPages();
      start = end - this.MAX_PAGE_BUTTONS_COUNT + 1;
    }

    for (let i = start; i <= end; i++) {
      pageButtons.push(i);
    }

    return pageButtons;
  });

  public goToFirstPage(): void {
    this.currentPage.set(1);
  }

  public goToLastPage(): void {
    this.currentPage.set(this.totalPages());
  }

  public goToPrevPage(): void {
    if (this.isFirstPage()) {
      return;
    }

    this.currentPage.update((current: number) => current - 1);
  }

  public goToNextPage(): void {
    if (this.isLastPage()) {
      return;
    }

    this.currentPage.update((current: number) => current + 1);
  }

  public goToPage(pageNumber: number): void {
    if (pageNumber < 1 || pageNumber > this.totalPages()) {
      return;
    }

    this.currentPage.set(pageNumber);
  }
}
