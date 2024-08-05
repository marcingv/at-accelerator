import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { SignedInUser } from '@core/models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  public signIn(login: string, password: string): Observable<SignedInUser> {
    return of(null).pipe(
      map(() => {
        login = login.trim();
        password = password.trim();

        if (!login || !password) {
          throw new HttpErrorResponse({
            error: 'Invalid credentails',
            status: 400,
          });
        }

        return {
          username: login,
          signInTime: Date.now(),
          role: 'user',
        };
      }),
    );
  }
}
