import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandLineViewerComponent } from './command-line-viewer.component';

describe('CommandLineViewerComponent', () => {
  let component: CommandLineViewerComponent;
  let fixture: ComponentFixture<CommandLineViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandLineViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandLineViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
