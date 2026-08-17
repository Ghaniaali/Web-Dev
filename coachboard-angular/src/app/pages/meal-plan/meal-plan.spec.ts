import { ComponentFixture, TestBed } from '@angular/core/testing';

import { mealplan } from './meal-plan';

describe('MealPlan', () => {
  let component: mealplan;
  let fixture: ComponentFixture<mealplan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [mealplan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(mealplan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
