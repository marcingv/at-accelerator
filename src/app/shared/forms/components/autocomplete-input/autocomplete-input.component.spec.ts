import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteInputComponent } from './autocomplete-input.component';
import {
  Component,
  DebugElement,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [AutocompleteInputComponent, ReactiveFormsModule],
  template: `
    <app-autocomplete-input
      [formControl]="control"
      [suggestions]="suggestions()"
      [itemsFiltering]="true"
    ></app-autocomplete-input>
  `,
})
class HostComponent {
  public control: FormControl<string | null> = new FormControl();
  public suggestions: WritableSignal<string[]> = signal([
    'Suggestion #1',
    'Suggestion #2',
    'Suggestion #3',
  ]);

  public autocompleteInput = viewChild(AutocompleteInputComponent);
}

describe('AutocompleteInputComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.autocompleteInput()).toBeTruthy();
  });

  it('should open and close suggestions menu', () => {
    const inputElement: DebugElement = fixture.debugElement.query(
      By.css('input'),
    );
    inputElement.triggerEventHandler('focus');
    component.control.setValue('#');
    fixture.detectChanges();

    let suggestionsList: DebugElement = fixture.debugElement.query(
      By.css('ul'),
    );

    expect(inputElement).toBeTruthy();
    expect(suggestionsList).toBeTruthy();

    window.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    suggestionsList = fixture.debugElement.query(By.css('ul'));

    expect(suggestionsList).toBeFalsy();
  });

  it('should display the list of suggestions', () => {
    const inputElement: DebugElement = fixture.debugElement.query(
      By.css('input'),
    );
    inputElement.triggerEventHandler('focus');
    component.control.setValue('#');
    fixture.detectChanges();

    const suggestionsList: DebugElement = fixture.debugElement.query(
      By.css('ul'),
    );
    const suggestionsItems: DebugElement[] = suggestionsList.queryAll(
      By.css('li'),
    );

    expect(suggestionsItems).toBeTruthy();
    expect(suggestionsItems.length).toEqual(3);
  });

  it('should filter suggestions', () => {
    const inputElement: DebugElement = fixture.debugElement.query(
      By.css('input'),
    );
    inputElement.triggerEventHandler('focus');
    component.control.setValue('#2');
    fixture.detectChanges();

    const suggestionsList: DebugElement = fixture.debugElement.query(
      By.css('ul'),
    );
    const suggestionsItems: DebugElement[] = suggestionsList.queryAll(
      By.css('li'),
    );

    expect(suggestionsItems).toBeTruthy();
    expect(suggestionsItems.length).toEqual(1);
    expect(suggestionsItems[0].nativeElement.textContent).toContain(
      'Suggestion #2',
    );
  });

  it('should set control value when suggestion is chosen', () => {
    const inputElement: DebugElement = fixture.debugElement.query(
      By.css('input'),
    );
    inputElement.triggerEventHandler('focus');
    component.control.setValue('#');
    fixture.detectChanges();

    const suggestionsList: DebugElement = fixture.debugElement.query(
      By.css('ul'),
    );
    const suggestionsItems: DebugElement[] = suggestionsList.queryAll(
      By.css('li'),
    );

    suggestionsItems[2].triggerEventHandler('click');

    expect(component.control.value).toEqual('Suggestion #3');
  });
});
