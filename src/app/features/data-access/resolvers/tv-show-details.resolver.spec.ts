import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { tvShowDetailsResolver } from './tv-show-details.resolver';
import { ResolvedTvShowDetails } from '@features/data-access/resolvers/types/resolved-tv-show-details';
import { Observable } from 'rxjs';

describe('tvShowDetailsResolver', () => {
  const executeResolver: ResolveFn<Observable<ResolvedTvShowDetails>> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      tvShowDetailsResolver(...resolverParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
