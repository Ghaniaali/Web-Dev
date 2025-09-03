import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesService } from './roles.service';

describe('RolesService', () => {
  let component: RolesService;
  let fixture: ComponentFixture<RolesService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
