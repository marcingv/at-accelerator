import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsViewComponent } from './details-view.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ResolvedTvShowDetails } from '@features/tv-shows-data-access/resolvers';

describe('DetailsViewComponent', () => {
  let component: DetailsViewComponent;
  let fixture: ComponentFixture<DetailsViewComponent>;

  const data: ResolvedTvShowDetails = {
    details: null,
    isResolveError: true,
    resolveErrorMessage: 'ERROR',
  };

  beforeEach(async () => {
    await TestBed.overrideComponent(DetailsViewComponent, {
      set: {
        imports: [],
        schemas: [NO_ERRORS_SCHEMA],
      },
    })
      .configureTestingModule({
        imports: [DetailsViewComponent],
      })
      .compileComponents();

    fixture = TestBed.createComponent(DetailsViewComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
