import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInPageComponent } from './sign-in-page.component';
import { UserService } from '@features/auth/data-access/services';

describe('SignInPageComponent', () => {
  let component: SignInPageComponent;
  let fixture: ComponentFixture<SignInPageComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userService = jasmine.createSpyObj<UserService>([
      'signInError',
      'signInPending',
    ]);

    await TestBed.configureTestingModule({
      imports: [SignInPageComponent],
      providers: [{ provide: UserService, useValue: userService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
