import {
  provideTransloco,
  TranslocoModule,
  TranslocoService,
} from '@jsverse/transloco';
import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { TranslocoHttpLoader } from './transloco-loader';
import { AVAILABLE_LANGS, DEFAULT_LANG } from './langs';
import { langPreloadInitializer } from './lang-preload.initializer';

@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: AVAILABLE_LANGS,
        defaultLang: DEFAULT_LANG,
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: langPreloadInitializer,
      deps: [TranslocoService],
    },
  ],
})
export class TranslocoRootModule {}
