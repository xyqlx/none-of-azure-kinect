import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShotRecorderComponent } from './shot-recorder.component';

describe('ShotRecorderComponent', () => {
  let component: ShotRecorderComponent;
  let fixture: ComponentFixture<ShotRecorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShotRecorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShotRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
