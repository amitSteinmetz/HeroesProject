import { TestBed } from '@angular/core/testing';

import { AllHeroesService } from './all-heroes.service';

describe('AllHeroesService', () => {
  let service: AllHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllHeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
