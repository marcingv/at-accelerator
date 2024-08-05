import { TranslocoService } from '@jsverse/transloco';
import { DEFAULT_LANG } from '@core/translations/langs';
import { firstValueFrom } from 'rxjs';

export function langPreloadInitializer(
  transloco: TranslocoService,
): () => Promise<boolean> {
  return () => {
    transloco.setActiveLang(DEFAULT_LANG);

    return firstValueFrom(transloco.load(DEFAULT_LANG)).then(() => true);
  };
}
