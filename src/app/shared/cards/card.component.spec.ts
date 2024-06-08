import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-host',
  standalone: true,
  template: `
    <app-card>
      <ng-template #header>My header</ng-template>
      <ng-template #body>My body</ng-template>
      <ng-template #footer>My footer</ng-template>
    </app-card>
  `,
  imports: [CardComponent],
})
class HostComponent {}

describe('CardComponent', () => {
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
    expect(
      fixture.debugElement.query(By.directive(CardComponent)),
    ).toBeTruthy();
  });

  it('should display card with header, body and footer', () => {
    const card: DebugElement = fixture.debugElement.query(
      By.directive(CardComponent),
    );
    const cardEl: HTMLElement = card.nativeElement;

    expect(cardEl.textContent).toContain('My header');
    expect(cardEl.textContent).toContain('My body');
    expect(cardEl.textContent).toContain('My footer');
  });
});
