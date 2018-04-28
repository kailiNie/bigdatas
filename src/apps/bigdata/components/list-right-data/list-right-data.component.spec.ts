import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRightDataComponent } from './list-right-data.component';

describe('ListRightDataComponent', () => {
  let component: ListRightDataComponent;
  let fixture: ComponentFixture<ListRightDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRightDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRightDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
