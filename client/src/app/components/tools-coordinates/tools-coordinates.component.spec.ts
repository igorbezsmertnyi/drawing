import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsCoordinatesComponent } from './tools-coordinates.component';

describe('ToolsCoordinatesComponent', () => {
  let component: ToolsCoordinatesComponent;
  let fixture: ComponentFixture<ToolsCoordinatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsCoordinatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsCoordinatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
