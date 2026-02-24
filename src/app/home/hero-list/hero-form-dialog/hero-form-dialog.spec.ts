import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFormDialog } from './hero-form-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('HeroFormDialog', () => {
  let component: HeroFormDialog;
  let fixture: ComponentFixture<HeroFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroFormDialog],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: { mode: 'create' } }
      ]
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
