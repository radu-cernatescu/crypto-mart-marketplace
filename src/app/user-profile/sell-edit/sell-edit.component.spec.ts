import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellEditComponent } from './sell-edit.component';

describe('SellEditComponent', () => {
  let component: SellEditComponent;
  let fixture: ComponentFixture<SellEditComponent>;

  beforeEach(async () => { 
    await TestBed.configureTestingModule({
      declarations: [ SellEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
