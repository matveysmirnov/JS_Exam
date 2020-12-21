import { TestBed } from '@angular/core/testing';

import { ItemsdataService } from './itemsdata.service';

describe('ItemsdataService', () => {
  let service: ItemsdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
