import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { firstValueFrom, ReplaySubject, Subject } from 'rxjs';
import { UserPersistenceEffects } from './user-persistence.effects';
import { Action } from '@ngrx/store';
import { BrowserStorage, LocalStorageService } from '@core/storage';
import { SignedInUser } from '@core/models';
import { UserActions } from '@features/auth/data-access/+state/user.actions';

describe('UserPersistenceEffects', () => {
  let actions$: Subject<Action>;
  let effects: UserPersistenceEffects;
  let storage: jasmine.SpyObj<BrowserStorage>;

  beforeEach(() => {
    actions$ = new ReplaySubject<Action>();

    storage = jasmine.createSpyObj<BrowserStorage>([
      'setItem',
      'getItem',
      'clearItem',
    ]);

    TestBed.configureTestingModule({
      providers: [
        UserPersistenceEffects,
        provideMockActions(() => actions$),
        {
          provide: LocalStorageService,
          useValue: storage,
        },
      ],
    });

    effects = TestBed.inject(UserPersistenceEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should save signed user into storage', async () => {
    const user: SignedInUser = {
      username: 'test',
      role: 'user',
      signInTime: Date.now(),
    };

    const sourceAction = UserActions.loginSuccess({ user: user });
    actions$.next(sourceAction);

    await firstValueFrom(effects.rememberSignedUser);

    expect(storage.setItem).toHaveBeenCalledWith(effects.STORAGE_KEY, user);
  });

  it('should clear signed user', async () => {
    const sourceAction = UserActions.logoutSuccess();
    actions$.next(sourceAction);

    await firstValueFrom(effects.clearSignedUser);

    expect(storage.clearItem).toHaveBeenCalledWith(effects.STORAGE_KEY);
  });

  it('should restore remembered user', async () => {
    const user: SignedInUser = {
      username: 'test',
      role: 'user',
      signInTime: Date.now(),
    };
    storage.getItem.and.returnValue(user);

    const sourceAction = UserActions.restoreRememberedUser();
    actions$.next(sourceAction);

    const resultAction = await firstValueFrom(effects.restoreRememberedUser);

    expect(resultAction).toEqual(
      UserActions.loginSuccess({ user: user, skipRedirect: true }),
    );
  });

  it('should do nothing when there is no remembered user', async () => {
    storage.getItem.and.returnValue(null);

    const sourceAction = UserActions.restoreRememberedUser();
    actions$.next(sourceAction);

    const resultAction = await firstValueFrom(effects.restoreRememberedUser);

    expect(resultAction).toEqual(UserActions.noRememberedUser());
  });
});
