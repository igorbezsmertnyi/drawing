import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsLineColorComponent } from './tools-line-color.component';

describe('ToolsLineColorComponent', () => {
  let component: ToolsLineColorComponent;
  let fixture: ComponentFixture<ToolsLineColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsLineColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsLineColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
