import { TestBed } from '@angular/core/testing';

import { OpenAi } from './open-ai';

describe('OpenAi', () => {
  let service: OpenAi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenAi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
