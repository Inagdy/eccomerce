import { TestBed } from '@angular/core/testing';

import { GetAllCategoriesService } from './get-all-categories.service';

describe('GetAllCategoriesService', () => {
  let service: GetAllCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
