import { TestBed } from '@angular/core/testing';

import { RecordRTCService } from './record-rtc.service';

describe('RecordRTCService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordRTCService = TestBed.get(RecordRTCService);
    expect(service).toBeTruthy();
  });
});
