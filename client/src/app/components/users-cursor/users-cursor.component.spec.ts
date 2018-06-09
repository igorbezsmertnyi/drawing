import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCursorComponent } from './users-cursor.component';

describe('UsersCursorComponent', () => {
  let component: UsersCursorComponent;
  let fixture: ComponentFixture<UsersCursorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersCursorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersCursorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
