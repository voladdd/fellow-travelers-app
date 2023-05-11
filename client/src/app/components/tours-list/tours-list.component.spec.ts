import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursListComponent } from './tours-list.component';

describe('ToursListComponent', () => {
  let component: ToursListComponent;
  let fixture: ComponentFixture<ToursListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToursListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
