import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { SignedInUser } from '@core/models';
import { AuthApiService } from '@core/api';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api: AuthApiService = inject(AuthApiService);

  private userSignal = signal<SignedInUser | null>(null);

  public isLoggedIn: Signal<boolean> = computed(() => !!this.userSignal());
  public isGuest: Signal<boolean> = computed(() => !this.userSignal());

  public get user(): Signal<SignedInUser | null> {
    return this.userSignal.asReadonly();
  }

  public signIn(
    login: string,
    password: string,
  ): Observable<SignedInUser | null> {
    return this.api.signIn(login, password).pipe(
      tap((response) => this.onSignInSuccess(response)),
      catchError(() => {
        this.onSignInFailure();

        return of(null);
      }),
    );
  }

  public signOut(): Observable<boolean> {
    this.userSignal.set(null);

    return of(true);
  }

  private onSignInSuccess(user: SignedInUser): void {
    this.userSignal.set(user);
  }

  private onSignInFailure(): void {
    this.userSignal.set(null);
  }
}
