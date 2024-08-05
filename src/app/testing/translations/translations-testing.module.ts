import { importProvidersFrom } from '@angular/core';
import {
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@jsverse/transloco';
import {
  AVAILABLE_LANGS,
  DEFAULT_LANG,
  TRANS_EN,
  TRANS_Pl,
} from '@core/translations';

export function provideTranslationsTestingModule(
  options: TranslocoTestingOptions = {},
) {
  return importProvidersFrom(
    TranslocoTestingModule.forRoot({
      langs: { TRANS_Pl, TRANS_EN },
      translocoConfig: {
        availableLangs: AVAILABLE_LANGS,
        defaultLang: DEFAULT_LANG,
      },
      preloadLangs: true,
      ...options,
    }),
  );
}
