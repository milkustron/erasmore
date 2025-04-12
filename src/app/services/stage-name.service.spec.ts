import { TestBed } from '@angular/core/testing';

import { StageNameService } from './stage-name.service';

describe('StageNameService', () => {
  let service: StageNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StageNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
