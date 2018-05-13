import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsBackgroundImageComponent } from './tools-background-image.component';

describe('ToolsBackgroundImageComponent', () => {
  let component: ToolsBackgroundImageComponent;
  let fixture: ComponentFixture<ToolsBackgroundImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsBackgroundImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsBackgroundImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
