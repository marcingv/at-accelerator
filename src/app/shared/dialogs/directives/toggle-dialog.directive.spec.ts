import { ToggleDialogDirective } from './toggle-dialog.directive';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { DialogComponent } from '@shared/dialogs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-host',
  standalone: true,
  template: `
    <button #toggleButton [appToggleDialog]="dialog"></button>

    <app-dialog #dialog>
      <ng-template #header>{{ dialogHeaderText }}</ng-template>

      {{ dialogBodyText }}

      <ng-template #footer>{{ dialogFooterText }}</ng-template>
    </app-dialog>
  `,
  imports: [DialogComponent, ToggleDialogDirective],
})
class HostComponent {
  public dialogHeaderText: string = 'My dialog header text';
  public dialogBodyText: string = 'My dialog body text';
  public dialogFooterText: string = 'My dialog footer text';

  @ViewChild('toggleButton', { read: ToggleDialogDirective, static: true })
  public toggleBtn!: ToggleDialogDirective;

  @ViewChild('dialog', { read: DialogComponent, static: true })
  public dialog!: DialogComponent;
}

describe('ToggleDialogDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.toggleBtn).toBeTruthy();
    expect(component.dialog).toBeTruthy();
  });

  it('should toggle dialog on btn click', () => {
    const toggleSpy = spyOn(component.dialog, 'toggle');
    const toggleBtn: DebugElement = fixture.debugElement.query(
      By.css('button'),
    );
    toggleBtn.triggerEventHandler('click');

    expect(toggleSpy).toHaveBeenCalled();
  });
});
