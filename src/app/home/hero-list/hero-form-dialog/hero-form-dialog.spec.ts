import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFormDialog } from './hero-form-dialog';

describe('HeroFormDialog', () => {
  let component: HeroFormDialog;
  let fixture: ComponentFixture<HeroFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroFormDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
