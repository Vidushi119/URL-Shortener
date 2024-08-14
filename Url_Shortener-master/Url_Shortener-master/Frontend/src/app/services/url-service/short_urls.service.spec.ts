import { TestBed } from '@angular/core/testing';

import { ShortUrlsService } from './short_url.service';

describe('GetUrlsService', () => {
  let service: ShortUrlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortUrlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
