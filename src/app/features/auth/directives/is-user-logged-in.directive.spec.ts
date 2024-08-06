import { IsUserLoggedInDirective } from './is-user-logged-in.directive';
import {
  Component,
  Signal,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '@features/auth/data-access/services';
import { provideRouter } from '@angular/router';
import { provideTranslationsTestingModule } from '@testing/translations';
import { SignedInUser } from '@core/models';

@Component({
  selector: 'app-host',
  standalone: true,
  template: `
    <span *appIsUserLoggedIn="{ notLoggedTemplate: notLogIn }; let user">
      Logged user: {{ user.username }}
    </span>

    <ng-template #notLogIn>User is not logged in</ng-template>
  `,
  imports: [IsUserLoggedInDirective],
})
class HostComponent {
  public directive = viewChild.required(IsUserLoggedInDirective);
}

describe('IsUserLoggedInDirective', () => {
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
    expect(component.directive()).toBeInstanceOf(IsUserLoggedInDirective);
  });

  it('should render template when user is logged in', () => {
    userSignal.set({
      username: 'myUserName',
      role: 'user',
      signInTime: Date.now(),
    });
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      'Logged user: myUserName',
    );
  });

  it('should render placeholder template when user is not logged in', () => {
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      'User is not logged in',
    );
  });
});
