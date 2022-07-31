import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesContainerComponent } from './devices-container.component';

describe('DevicesContainerComponent', () => {
  let component: DevicesContainerComponent;
  let fixture: ComponentFixture<DevicesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
