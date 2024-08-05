import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TvShow, TvShowId } from '@core/models';
import { HttpErrorResponse } from '@angular/common/http';

export const WishlistActions = createActionGroup({
  source: 'Wishlist',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ models: TvShow[] }>(),
    'Load Failure': props<{ error: HttpErrorResponse }>(),
    Set: props<{ ids: TvShowId[] }>(),
    Toggle: props<{ id: TvShowId }>(),
    Clear: emptyProps(),
    'Persist User Preferences': emptyProps(),
    'Restore User Preferences': emptyProps(),
  },
});
