import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Hero } from '../../../features/entities/hero/interface/hero.interface';
import { UppercaseInput } from '../../../features/directives/uppercase-input';

export interface HeroFormDialogData {
  mode: 'create' | 'update';
  hero?: Hero;
}

@Component({
  selector: 'app-hero-form-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    UppercaseInput,
  ],
  templateUrl: './hero-form-dialog.html',
  styleUrl: './hero-form-dialog.scss',
})
export class HeroFormDialog implements OnInit {

  private readonly fb = inject(FormBuilder);
  protected readonly dialogRef = inject(MatDialogRef<HeroFormDialog>);
  protected readonly data: HeroFormDialogData = inject(MAT_DIALOG_DATA);

  heroForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(100)]],
    age: [0, [Validators.required, Validators.min(0)]],
    power: ['', [Validators.required, Validators.maxLength(100)]],
  });

  get f(): { [key: string]: AbstractControl } {
    return this.heroForm.controls;
  }

  ngOnInit(): void {
    if (this.data.mode === 'update' && this.data.hero) {
      const { name, description, age, power } = this.data.hero;
      this.heroForm.setValue({ name, description, age, power });
    }
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      const value = this.heroForm.getRawValue();
      const result = this.data.mode === 'update' && this.data.hero
        ? { ...value, id: this.data.hero.id }
        : value;
      this.dialogRef.close(result);
    } else {
      this.heroForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
