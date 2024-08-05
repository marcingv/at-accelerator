import { IsGuestDirective } from './is-guest.directive';
import { Component, signal, viewChild, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '@features/auth/data-access/services';
import { SignedInUser } from '@core/models';
import { provideRouter } from '@angular/router';
import { provideTranslationsTestingModule } from '@testing/translations';

@Component({
  selector: 'app-host',
  standalone: true,
  template: `
    <span *appIsGuest="{ notGuestTemplate: notGuest }; let user">
      Is guest user
    </span>

    <ng-template #notGuest>Is not a guest</ng-template>
  `,
  imports: [IsGuestDirective],
})
class HostComponent {
  public directive = viewChild.required(IsGuestDirective);
}

describe('IsGuestDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let userService: Partial<UserService>;

  let userSignal: WritableSignal<SignedInUser | null>;

  beforeEach(async () => {
    userSignal = signal(null);
    userService = {
      user: userSignal,
    };

    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        provideRouter([]),
        provideTranslationsTestingModule(),
        { provide: UserService, useValue: userService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
    expect(component.directive()).toBeTruthy();
    expect(component.directive()).toBeInstanceOf(IsGuestDirective);
  });

  it('should render template when user is a guest', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      'Is guest user',
    );
  });

  it('should render placeholder template when user is not a guest', () => {
    userSignal.set({
      username: 'myUserName',
      role: 'user',
      signInTime: Date.now(),
    });
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      'Is not a guest',
    );
  });
});
