import { TestBed } from '@angular/core/testing';

import { UserPrefsBroadcastChannelService } from './user-prefs-broadcast-channel.service';

describe('UserPrefsBroadcastChannelService', () => {
  let service: UserPrefsBroadcastChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPrefsBroadcastChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
