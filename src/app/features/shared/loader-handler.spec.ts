import { TestBed } from '@angular/core/testing';

import { LoaderHandler } from './loader-handler';

describe('LoaderHandler', () => {
  let service: LoaderHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
