import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteArtboardsComponent } from './remote-artboards.component';

describe('RemoteArtboardsComponent', () => {
  let component: RemoteArtboardsComponent;
  let fixture: ComponentFixture<RemoteArtboardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteArtboardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteArtboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
