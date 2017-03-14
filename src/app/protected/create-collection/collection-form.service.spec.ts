/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CollectionFormService } from './collection-form.service';

describe('CollectionFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionFormService]
    });
  });

  it('should ...', inject([CollectionFormService], (service: CollectionFormService) => {
    expect(service).toBeTruthy();
  }));
});
