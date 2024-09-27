import { TestBed } from '@angular/core/testing';

import { UsersBroadcastChannelService } from './users-broadcast-channel.service';

describe('UsersBroadcastChannelService', () => {
  let service: UsersBroadcastChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersBroadcastChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
