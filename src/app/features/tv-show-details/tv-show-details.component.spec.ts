import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowDetailsComponent } from './tv-show-details.component';
import { TvShowDetails } from '@core/models';

describe('TvShowDetailsComponent', () => {
  let component: TvShowDetailsComponent;
  let fixture: ComponentFixture<TvShowDetailsComponent>;

  const details: TvShowDetails = {
    id: 35624,
    name: 'The Flash',
    permalink: 'the-flash',
    url: 'https://www.episodate.com/tv-show/the-flash',
    description:
      'Barry Allen is a Central City police forensic scientist with a reasonably happy life, despite the childhood trauma of a mysterious red and yellow being killing his mother and framing his father. All that changes when a massive particle accelerator accident leads to Barry being struck by lightning in his lab. Coming out of coma nine months later, Barry and his new friends at STAR labs find that he now has the ability to move at superhuman speed. <br>Furthermore, Barry learns that he is but one of many affected by that event, most of whom are using their powers for evil. Determined to make a difference, Barry dedicates his life to fighting such threats, as The Flash. While he gains allies he never expected, there are also secret forces determined to aid and manipulate him for their own agenda.',
    description_source:
      'http://www.imdb.com/title/tt3107288/plotsummary?ref_=tt_stry_pl',
    start_date: '2014-10-07',
    end_date: null,
    country: 'US',
    status: 'Ended',
    runtime: 60,
    network: 'The CW',
    youtube_link: null,
    image_path: 'https://static.episodate.com/images/tv-show/full/35624.jpg',
    image_thumbnail_path:
      'https://static.episodate.com/images/tv-show/thumbnail/35624.jpg',
    rating: '9.3152',
    rating_count: '1618',
    countdown: null,
    genres: ['Drama', 'Action', 'Science-Fiction'],
    pictures: [
      'https://static.episodate.com/images/episode/35624-559.jpg',
      'https://static.episodate.com/images/episode/35624-973.jpg',
      'https://static.episodate.com/images/episode/35624-201.jpg',
      'https://static.episodate.com/images/episode/35624-783.jpg',
      'https://static.episodate.com/images/episode/35624-130.jpg',
      'https://static.episodate.com/images/episode/35624-551.jpg',
      'https://static.episodate.com/images/episode/35624-620.jpg',
    ],
    episodes: [
      {
        season: 1,
        episode: 1,
        name: 'Pilot',
        air_date: '2014-10-08 00:00:00',
      },
      {
        season: 1,
        episode: 2,
        name: 'Fastest Man Alive',
        air_date: '2014-10-15 00:00:00',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TvShowDetailsComponent);
    component = fixture.componentInstance;
    component.details = details;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
