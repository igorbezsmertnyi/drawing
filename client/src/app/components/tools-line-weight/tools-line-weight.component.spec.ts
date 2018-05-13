import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsLineWeightComponent } from './tools-line-weight.component';

describe('ToolsLineWeightComponent', () => {
  let component: ToolsLineWeightComponent;
  let fixture: ComponentFixture<ToolsLineWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsLineWeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsLineWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
