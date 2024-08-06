import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ShowsAutocompleteInputComponent } from './shows-autocomplete-input.component';
import { TvShowsApiService } from '@core/api';
import { Component, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TvShowDetailsFactory } from '@testing/factories';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [ShowsAutocompleteInputComponent, ReactiveFormsModule],
  template: `
    <app-shows-autocomplete-input
      [formControl]="control"
    ></app-shows-autocomplete-input>
  `,
})
class HostComponent {
  public control: FormControl<string | null> = new FormControl(null);
  public autocompleteInput = viewChild(ShowsAutocompleteInputComponent);
}

describe('ShowsAutocompleteInputComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let api: jasmine.SpyObj<TvShowsApiService>;

  beforeEach(async () => {
    api = jasmine.createSpyObj<TvShowsApiService>(['search']);

    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: TvShowsApiService, useValue: api }],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.autocompleteInput()).toBeTruthy();
  });

  it('should load suggestions on control value change', fakeAsync(() => {
    api.search.and.returnValue(
      of({
        tv_shows: [
          TvShowDetailsFactory.createInstance({ name: 'Show #1' }),
          TvShowDetailsFactory.createInstance({ name: 'Show #2' }),
          TvShowDetailsFactory.createInstance({ name: 'Show #3' }),
        ],
        pages: 1,
        page: 1,
        total: '3',
      }),
    );

    expect(api.search).not.toHaveBeenCalled();

    component.control.setValue('query');
    tick(300);

    const loadedSuggestions = component.autocompleteInput()?.suggestions();

    expect(api.search).toHaveBeenCalledWith('query');
    expect(loadedSuggestions).toBeTruthy();
    expect(loadedSuggestions?.length).toEqual(3);
  }));
});
