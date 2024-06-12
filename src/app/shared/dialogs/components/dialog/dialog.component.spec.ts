import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-host',
  standalone: true,
  template: `
    <app-dialog #dialog>
      <ng-template #header>{{ dialogHeaderText }}</ng-template>

      {{ dialogBodyText }}

      <ng-template #footer>{{ dialogFooterText }}</ng-template>
    </app-dialog>
  `,
  imports: [DialogComponent],
})
class HostComponent {
  public dialogHeaderText: string = 'My dialog header text';
  public dialogBodyText: string = 'My dialog body text';
  public dialogFooterText: string = 'My dialog footer text';
}

describe('DialogComponent', () => {
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
  });

  it('should render dialog title, body and footer', () => {
    const header: DebugElement = fixture.debugElement.query(
      By.css('.dialog-header'),
    );
    const body: DebugElement = fixture.debugElement.query(
      By.css('.dialog-body'),
    );
    const footer: DebugElement = fixture.debugElement.query(
      By.css('.dialog-footer'),
    );

    expect(header).toBeTruthy();
    expect(header.nativeElement.textContent).toContain(
      component.dialogHeaderText,
    );

    expect(body).toBeTruthy();
    expect(body.nativeElement.textContent).toContain(component.dialogBodyText);

    expect(footer).toBeTruthy();
    expect(footer.nativeElement.textContent).toContain(
      component.dialogFooterText,
    );
  });

  it('should render dialog close button', () => {
    const closeBtn: DebugElement = fixture.debugElement.query(
      By.css('.dialog-close'),
    );

    expect(closeBtn).toBeTruthy();
  });
});
