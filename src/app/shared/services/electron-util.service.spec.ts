import { TestBed } from '@angular/core/testing';

import { ElectronUtilService } from './electron-util.service';

describe('ElectronUtilService', () => {
  let service: ElectronUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectronUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
