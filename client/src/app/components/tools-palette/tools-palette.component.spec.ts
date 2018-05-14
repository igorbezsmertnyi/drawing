import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsPaletteComponent } from './tools-palette.component';

describe('ToolsPaletteComponent', () => {
  let component: ToolsPaletteComponent;
  let fixture: ComponentFixture<ToolsPaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsPaletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
