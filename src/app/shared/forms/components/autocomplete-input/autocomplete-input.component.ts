import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  HostBinding,
  inject,
  input,
  InputSignal,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { fromEvent, Observable, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormControlDirective } from '@shared/forms';

@Component({
  selector: 'app-autocomplete-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormControlDirective],
  templateUrl: './autocomplete-input.component.html',
  styleUrl: './autocomplete-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteInputComponent),
      multi: true,
    },
  ],
})
export class AutocompleteInputComponent implements ControlValueAccessor {
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  private onChangeCallback?: (value: string | null) => void;
  private onTouchedCallback?: () => void;

  private readonly clickEvents$: Observable<Event> = fromEvent(window, 'click');

  protected readonly queryCtrl: FormControl<string | null> = new FormControl(
    null,
  );

  protected readonly filterQuery: Signal<string | null | undefined> = toSignal(
    this.queryCtrl.valueChanges,
  );

  public suggestions: InputSignal<string[]> = input<string[]>([]);
  public placeholder: InputSignal<string> = input<string>('');
  public itemsFiltering: InputSignal<boolean> = input<boolean>(true);

  protected filteredSuggestions = computed(() =>
    this.itemsFiltering()
      ? this.filterSuggestions(this.suggestions(), this.filterQuery())
      : this.suggestions(),
  );

  protected menuOpened: WritableSignal<boolean> = signal<boolean>(false);

  @HostBinding('class') public readonly class = 'flex';

  public constructor() {
    this.setUpControlValueChangesNotifier();
    this.setUpMenuCloseListener();
  }

  public writeValue(obj: string | null): void {
    this.queryCtrl.setValue(obj);
  }

  public registerOnChange(fn: (value: string | null) => void): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    if (isDisabled && this.queryCtrl.enabled) {
      this.queryCtrl.disable();
    } else if (!isDisabled && this.queryCtrl.disabled) {
      this.queryCtrl.enable();
    }
  }

  protected chooseSuggestion(oneSuggestion: string): void {
    this.queryCtrl.setValue(oneSuggestion);
    this.menuOpened.set(false);
  }

  protected onInputFocus(): void {
    this.menuOpened.set(true);
  }

  protected onInputBlur(): void {
    if (this.onTouchedCallback) {
      this.onTouchedCallback();
    }
  }

  private setUpControlValueChangesNotifier(): void {
    this.queryCtrl.valueChanges
      .pipe(
        tap((value: string | null) => {
          if (this.onChangeCallback) {
            this.onChangeCallback(value);
          }
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  private setUpMenuCloseListener(): void {
    this.clickEvents$
      .pipe(
        tap((event: Event) => {
          if (!this.menuOpened()) {
            return;
          }

          const hostElement: HTMLElement = this.elementRef.nativeElement;
          const isClickWithinHost: boolean = event
            .composedPath()
            .includes(hostElement);

          if (isClickWithinHost) {
            return;
          }

          this.menuOpened.set(false);
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  private filterSuggestions(
    allSuggestions: string[],
    filterQuery: string | null | undefined,
  ): string[] {
    if (!filterQuery || !filterQuery.length) {
      return allSuggestions;
    } else {
      return allSuggestions.filter((oneSuggestion) => {
        return oneSuggestion.toLowerCase().includes(filterQuery.toLowerCase());
      });
    }
  }
}
