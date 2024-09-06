import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SignedInUser } from '@core/models';
import { HttpErrorResponse } from '@angular/common/http';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    Set: props<{ user: SignedInUser }>(),
    Login: props<{ username: string; password: string }>(),
    'Login Success': props<{ user: SignedInUser; skipRedirect?: boolean }>(),
    'Login Failure': props<{ username: string; error: HttpErrorResponse }>(),
    Logout: emptyProps(),
    'Logout Success': emptyProps(),
    'Restore Remembered User': emptyProps(),
    'No Remembered User': emptyProps(),
  },
});
