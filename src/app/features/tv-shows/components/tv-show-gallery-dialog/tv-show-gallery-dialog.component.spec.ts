import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvShowGalleryDialogComponent } from './tv-show-gallery-dialog.component';
import { TvShowDetails } from '@core/models';
import { TvShowDetailsFactory } from '@testing/factories';
import { By } from '@angular/platform-browser';
import { DialogComponent } from '@shared/dialogs';
import { DebugElement } from '@angular/core';

describe('TvShowGalleryDialogComponent', () => {
  let component: TvShowGalleryDialogComponent;
  let fixture: ComponentFixture<TvShowGalleryDialogComponent>;

  const tvShow: TvShowDetails = TvShowDetailsFactory.createInstance();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowGalleryDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TvShowGalleryDialogComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tvShow', tvShow);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a dialog', () => {
    const dialogCmp: DebugElement = fixture.debugElement.query(
      By.directive(DialogComponent),
    );

    expect(dialogCmp).toBeTruthy();
    expect(component.dialog).toBeTruthy();
    expect(component.dialog).toBe(dialogCmp.componentInstance);
  });
});
