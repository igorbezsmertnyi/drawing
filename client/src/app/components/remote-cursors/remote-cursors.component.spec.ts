import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteCursorsComponent } from './remote-cursors.component';

describe('RemoteCursorsComponent', () => {
  let component: RemoteCursorsComponent;
  let fixture: ComponentFixture<RemoteCursorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteCursorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteCursorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
