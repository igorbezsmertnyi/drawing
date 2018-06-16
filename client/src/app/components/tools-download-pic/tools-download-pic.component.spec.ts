import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsDownloadPicComponent } from './tools-download-pic.component';

describe('ToolsDownloadPicComponent', () => {
  let component: ToolsDownloadPicComponent;
  let fixture: ComponentFixture<ToolsDownloadPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsDownloadPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsDownloadPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
