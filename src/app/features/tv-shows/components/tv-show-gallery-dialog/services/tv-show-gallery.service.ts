import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  inject,
  Injectable,
  OutputRefSubscription,
} from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { TvShowGalleryDialogComponent } from '@features/tv-shows/components/tv-show-gallery-dialog';
import { TvShowDetails, TvShowId } from '@core/models';
import { DOCUMENT } from '@angular/common';
import { TvShowDetailsService } from '@features/tv-shows/data-access/services/tv-show-details.service';

@Injectable({
  providedIn: 'root',
})
export class TvShowGalleryService {
  public readonly HOST_ELEMENT_ID: string = 'tv-show-gallery-dialog';

  protected readonly document = inject(DOCUMENT);
  protected readonly applicationRef: ApplicationRef = inject(ApplicationRef);
  protected readonly detailsService: TvShowDetailsService =
    inject(TvShowDetailsService);

  public showDialog(
    id: TvShowId,
  ): Observable<ComponentRef<TvShowGalleryDialogComponent> | null> {
    const o$ =
      new ReplaySubject<ComponentRef<TvShowGalleryDialogComponent> | null>(1);

    this.detailsService
      .getDetails(id)
      .pipe(
        tap((details: TvShowDetails | null): void => {
          if (!details) {
            o$.next(null);

            return;
          }

          const cmpRef: ComponentRef<TvShowGalleryDialogComponent> =
            this.createAndShow(details);

          o$.next(cmpRef);
        }),
      )
      .subscribe();

    return o$.asObservable();
  }

  private getDialogHostElement(): HTMLElement {
    let hostElement: HTMLElement | null = this.document.getElementById(
      this.HOST_ELEMENT_ID,
    );
    if (!hostElement) {
      hostElement = this.document.createElement('div');
      hostElement.id = this.HOST_ELEMENT_ID;

      this.document.body.append(hostElement);
    }

    return hostElement;
  }

  private createAndShow(
    details: TvShowDetails,
  ): ComponentRef<TvShowGalleryDialogComponent> {
    const hostElement: HTMLElement = this.getDialogHostElement();

    const cmpRef: ComponentRef<TvShowGalleryDialogComponent> = createComponent(
      TvShowGalleryDialogComponent,
      {
        environmentInjector: this.applicationRef.injector,
        hostElement: hostElement,
      },
    );

    cmpRef.setInput('tvShow', details);
    cmpRef.changeDetectorRef.detectChanges();

    const closedSubscription: OutputRefSubscription =
      cmpRef.instance.closed.subscribe((): void => {
        this.applicationRef.detachView(cmpRef.hostView);
        cmpRef.destroy();
        closedSubscription.unsubscribe();
      });

    this.applicationRef.attachView(cmpRef.hostView);
    cmpRef.instance.dialog.toggle();

    return cmpRef;
  }
}
