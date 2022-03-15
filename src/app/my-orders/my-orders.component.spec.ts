import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOdersComponent } from './my-oders.component';

describe('MyOdersComponent', () => {
  let component: MyOdersComponent;
  let fixture: ComponentFixture<MyOdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
