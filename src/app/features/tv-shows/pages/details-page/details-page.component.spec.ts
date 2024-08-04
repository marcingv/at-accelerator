import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsPageComponent } from './details-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ResolvedTvShowDetails } from '@features/tv-shows/data-access/resolvers';

describe('DetailsPageComponent', () => {
  let component: DetailsPageComponent;
  let fixture: ComponentFixture<DetailsPageComponent>;

  const data: ResolvedTvShowDetails = {
    details: null,
    isResolveError: true,
    resolveErrorMessage: 'ERROR',
  };

  beforeEach(async () => {
    await TestBed.overrideComponent(DetailsPageComponent, {
      set: {
        imports: [],
        schemas: [NO_ERRORS_SCHEMA],
      },
    })
      .configureTestingModule({
        imports: [DetailsPageComponent],
      })
      .compileComponents();

    fixture = TestBed.createComponent(DetailsPageComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', data);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
