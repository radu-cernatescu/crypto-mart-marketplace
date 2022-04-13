import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingsArchiveComponent } from './listings-archive.component';

describe('ListingsArchiveComponent', () => {
  let component: ListingsArchiveComponent;
  let fixture: ComponentFixture<ListingsArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingsArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingsArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
