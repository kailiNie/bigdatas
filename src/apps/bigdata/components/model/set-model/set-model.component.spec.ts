import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetModelComponent } from './set-model.component';

describe('SetModelComponent', () => {
  let component: SetModelComponent;
  let fixture: ComponentFixture<SetModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
