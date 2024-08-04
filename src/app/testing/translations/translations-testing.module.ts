import { importProvidersFrom } from '@angular/core';
import {
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@jsverse/transloco';
import { TRANS_EN, TRANS_Pl } from '@core/translations';

export function provideTranslationsTestingModule(
  options: TranslocoTestingOptions = {},
) {
  return importProvidersFrom(
    TranslocoTestingModule.forRoot({
      langs: { TRANS_Pl, TRANS_EN },
      translocoConfig: {
        availableLangs: ['en', 'pl'],
        defaultLang: 'en',
      },
      preloadLangs: true,
      ...options,
    }),
  );
}
