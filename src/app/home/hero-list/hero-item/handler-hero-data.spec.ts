import { TestBed } from '@angular/core/testing';

import { HandlerHeroData } from './handler-hero-data';

describe('HandlerHeroData', () => {
  let service: HandlerHeroData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandlerHeroData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
