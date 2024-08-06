import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostBinding,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  TouchedChangeEvent,
} from '@angular/forms';
import { FormControlDirective } from '@shared/forms';
import { NgClass } from '@angular/common';
import { TvShowsApiService } from '@core/api';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  skip,
  switchMap,
  tap,
} from 'rxjs';
import { TvShow, TvShowsPagedCollectionResponse } from '@core/models';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AutocompleteInputComponent } from '@shared/forms/components/autocomplete-input';

@Component({
  selector: 'app-shows-autocomplete-input',
  standalone: true,
  imports: [
    FormControlDirective,
    ReactiveFormsModule,
    NgClass,
    AutocompleteInputComponent,
  ],
  templateUrl: './shows-autocomplete-input.component.html',
  styleUrl: './shows-autocomplete-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShowsAutocompleteInputComponent),
      multi: true,
    },
  ],
})
export class ShowsAutocompleteInputComponent implements ControlValueAccessor {
  private readonly DEBOUNCE_TIME_MS: number = 300;
  private readonly api: TvShowsApiService = inject(TvShowsApiService);

  protected readonly queryCtrl: FormControl<string | null> = new FormControl(
    null,
  );

  private suggestions$: Observable<string[]> = this.queryCtrl.valueChanges.pipe(
    skip(1),
    debounceTime(this.DEBOUNCE_TIME_MS),
    distinctUntilChanged(),
    switchMap((query: string | null) => {
      if (!query || !query.trim().length) {
        return of([]);
      }

      return this.api.search(query).pipe(
        map((response: TvShowsPagedCollectionResponse) => {
          return response.tv_shows.map((show: TvShow) => show.name);
        }),
        catchError(() => of([])),
      );
    }),
  );

  public suggestions = toSignal(this.suggestions$, { initialValue: [] });

  private onChangeCallback?: (value: string | null) => void;
  private onTouchedCallback?: () => void;

  @HostBinding('class') public class = 'flex';

  public constructor() {
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

    this.queryCtrl.events
      .pipe(
        tap((event) => {
          if (
            event instanceof TouchedChangeEvent &&
            event.touched &&
            this.onTouchedCallback
          ) {
            this.onTouchedCallback();
          }
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
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
}
