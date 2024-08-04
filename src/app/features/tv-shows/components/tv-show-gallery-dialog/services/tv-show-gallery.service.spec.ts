import { TestBed } from '@angular/core/testing';
import { TvShowGalleryService } from './tv-show-gallery.service';
import { firstValueFrom, of } from 'rxjs';
import { TvShowDetailsFactory } from '@testing/factories';
import { TvShowDetails } from '@core/models';
import { DOCUMENT } from '@angular/common';
import { TvShowGalleryDialogComponent } from '@features/tv-shows/components/tv-show-gallery-dialog';
import { TvShowDetailsService } from '@features/tv-shows/data-access/services/tv-show-details.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('TvShowGalleryService', () => {
  let service: TvShowGalleryService;
  let detailsService: SpyObj<TvShowDetailsService>;
  let document: Document;

  const tvShowDetails: TvShowDetails = TvShowDetailsFactory.createInstance();

  beforeEach(() => {
    detailsService = createSpyObj<TvShowDetailsService>(['getDetails']);
    detailsService.getDetails.and.returnValue(of(tvShowDetails));

    TestBed.configureTestingModule({
      providers: [{ provide: TvShowDetailsService, useValue: detailsService }],
    });
    service = TestBed.inject(TvShowGalleryService);
    document = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dynamically create dialog component', async () => {
    let dialogHost: HTMLElement | null = document.getElementById(
      service.HOST_ELEMENT_ID,
    );
    expect(dialogHost).toBeNull();

    const cmpRef = await firstValueFrom(service.showDialog(tvShowDetails.id));
    expect(cmpRef).toBeTruthy();
    expect(cmpRef!.instance).toBeInstanceOf(TvShowGalleryDialogComponent);

    dialogHost = document.getElementById(service.HOST_ELEMENT_ID);
    expect(dialogHost).toBeTruthy();
  });

  it('should close dialog and remove host placeholder from DOM', async () => {
    let dialogHost: HTMLElement | null = document.getElementById(
      service.HOST_ELEMENT_ID,
    );
    expect(dialogHost).toBeNull();

    const cmpRef = await firstValueFrom(service.showDialog(tvShowDetails.id));
    expect(cmpRef).toBeTruthy();

    dialogHost = document.getElementById(service.HOST_ELEMENT_ID);
    expect(dialogHost).toBeTruthy();

    cmpRef?.instance.dialog.closed.next();
    dialogHost = document.getElementById(service.HOST_ELEMENT_ID);
    expect(dialogHost).toBeNull();
  });
});
