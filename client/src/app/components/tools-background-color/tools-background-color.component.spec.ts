import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsBackgroundColorComponent } from './tools-background-color.component';

describe('ToolsBackgroundColorComponent', () => {
  let component: ToolsBackgroundColorComponent;
  let fixture: ComponentFixture<ToolsBackgroundColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsBackgroundColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsBackgroundColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
