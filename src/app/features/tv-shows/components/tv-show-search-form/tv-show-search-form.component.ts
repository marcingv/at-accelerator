import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, tap } from 'rxjs';
import { ButtonDirective } from '@shared/buttons/directives';

@Component({
  selector: 'app-tv-show-search-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonDirective],
  templateUrl: './tv-show-search-form.component.html',
  styleUrl: './tv-show-search-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvShowSearchFormComponent implements OnInit, OnChanges {
  public formGroup: FormGroup<{ query: FormControl<string | null> }> =
    new FormGroup({
      query: new FormControl<string | null>(null),
    });

  @Input() public query?: string | null;
  @Output() public queryChange = new EventEmitter<string | null>();
  @Output() public search = new EventEmitter<string | null>();

  public ngOnChanges(): void {
    if (this.query) {
      this.formGroup.controls.query.setValue(this.query);
    }
  }

  public ngOnInit(): void {
    this.formGroup.controls.query.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((value: string | null): void => {
          this.query = value ?? null;
          this.queryChange.next(this.query);
        }),
      )
      .subscribe();
  }

  public onSubmitSearch(): void {
    this.search.next(this.formGroup.controls.query.value);
  }
}
