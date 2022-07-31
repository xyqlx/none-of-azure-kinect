import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionContentsComponent } from './function-contents.component';

describe('FunctionContentsComponent', () => {
  let component: FunctionContentsComponent;
  let fixture: ComponentFixture<FunctionContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionContentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
