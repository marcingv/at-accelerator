import { TestBed } from '@angular/core/testing';

import { AuthApiService } from './auth-api.service';
import { catchError, firstValueFrom, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthApiService', () => {
  let service: AuthApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an error for invalid credentials', async () => {
    const response = await firstValueFrom(
      service.signIn(' ', ' ').pipe(catchError((err) => of(err))),
    );

    expect(response).toBeInstanceOf(HttpErrorResponse);
  });

  it('should successfully sign in', async () => {
    const response = await firstValueFrom(service.signIn('marcingv', 'haslo'));

    expect(response).toBeTruthy();
    expect(response.username).toEqual('marcingv');
    expect(response.signInTime).toBeTruthy();
    expect(response.role).toEqual('user');
  });
});
