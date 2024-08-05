import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSigningComponent } from './user-signing.component';
import { UserService } from '@features/auth/data-access/services';
import { provideRouter } from '@angular/router';
import { provideTranslationsTestingModule } from '@testing/translations';

describe('UserSigningComponent', () => {
  let component: UserSigningComponent;
  let fixture: ComponentFixture<UserSigningComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    userService = jasmine.createSpyObj<UserService>(['user']);

    await TestBed.configureTestingModule({
      imports: [UserSigningComponent],
      providers: [
        provideRouter([]),
        provideTranslationsTestingModule(),
        { provide: UserService, useValue: userService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
