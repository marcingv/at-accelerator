import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { AuthApiService } from '@core/api';
import { firstValueFrom, of } from 'rxjs';
import { provideStore } from '@ngrx/store';
import { fromUser, UserEffects } from '@features/auth/data-access/+state';
import { provideEffects } from '@ngrx/effects';

describe('UserService', () => {
  let service: UserService;
  let api: jasmine.SpyObj<AuthApiService>;

  beforeEach(() => {
    api = jasmine.createSpyObj<AuthApiService>(['signIn']);
    api.signIn.and.callFake((login) =>
      of({
        username: login,
        signInTime: Date.now(),
        role: 'user',
      }),
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthApiService, useValue: api },
        provideStore({
          [fromUser.userFeatureKey]: fromUser.reducer,
        }),
        provideEffects(UserEffects),
      ],
    });

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign in user', async () => {
    expect(service.isGuest()).toBeTrue();
    expect(service.isLoggedIn()).toBeFalse();
    expect(service.user()).toBeFalsy();

    const result = await firstValueFrom(
      service.signIn('myUserName', 'password'),
    );

    expect(result).toBeTruthy();
    expect(service.isGuest()).toBeFalse();
    expect(service.isLoggedIn()).toBeTrue();
    expect(service.user()).toBeTruthy();
    expect(service.user()?.username).toEqual('myUserName');
  });

  it('should sign out user', async () => {
    const result = await firstValueFrom(
      service.signIn('myUserName', 'password'),
    );

    expect(result).toBeTruthy();
    expect(service.isGuest()).toBeFalse();
    expect(service.isLoggedIn()).toBeTrue();
    expect(service.user()).toBeTruthy();

    await firstValueFrom(service.signOut());

    expect(service.isGuest()).toBeTrue();
    expect(service.isLoggedIn()).toBeFalse();
    expect(service.user()).toEqual(null);
  });
});
