import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { AuthApiService } from '@core/api';
import { firstValueFrom, of } from 'rxjs';

fdescribe('UserService', () => {
  let service: UserService;
  let api: jasmine.SpyObj<AuthApiService>;

  beforeEach(() => {
    api = jasmine.createSpyObj<AuthApiService>(['signIn']);

    TestBed.configureTestingModule({});

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign in user', async () => {
    expect(service.isGuest()).toBeTrue();
    expect(service.isLoggedIn()).toBeFalse();
    expect(service.user()).toBeFalsy();

    api.signIn.and.returnValue(
      of({
        username: 'myUserName',
        signInTime: Date.now(),
        role: 'user',
      }),
    );

    const result = await firstValueFrom(
      service.signIn('myUserName', 'password'),
    );

    expect(result).toBeTruthy();
    expect(service.isGuest()).toBeFalse();
    expect(service.isLoggedIn()).toBeTrue();
    expect(service.user()).toBeTruthy();
  });

  it('should sign out user', async () => {
    api.signIn.and.returnValue(
      of({
        username: 'myUserName',
        signInTime: Date.now(),
        role: 'user',
      }),
    );

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
