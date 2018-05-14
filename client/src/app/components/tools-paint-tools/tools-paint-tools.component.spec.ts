import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsPainSrcComponent } from './tools-pain-src.component';

describe('ToolsPainSrcComponent', () => {
  let component: ToolsPainSrcComponent;
  let fixture: ComponentFixture<ToolsPainSrcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsPainSrcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsPainSrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
