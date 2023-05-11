import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourCreationPageComponent } from './tour-creation-page.component';

describe('TourCreationPageComponent', () => {
  let component: TourCreationPageComponent;
  let fixture: ComponentFixture<TourCreationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourCreationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
