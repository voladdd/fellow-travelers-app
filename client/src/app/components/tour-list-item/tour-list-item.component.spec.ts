import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourListItemComponent } from './tour-list-item.component';

describe('TourListItemComponent', () => {
  let component: TourListItemComponent;
  let fixture: ComponentFixture<TourListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
