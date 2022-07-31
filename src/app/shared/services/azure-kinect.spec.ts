import { TestBed } from '@angular/core/testing';

import { AzureKinectService } from './azure-kinect.service';

describe('AzureKinectServiceService', () => {
  let service: AzureKinectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureKinectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
