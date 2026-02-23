import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmData {
  heroName: string;
}

@Component({
  selector: 'app-confirm-modal',
  imports: [
    MatIconModule
  ],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.scss',
})
export class ConfirmModal {

  protected readonly dialogRef = inject(MatDialogRef<ConfirmModal>);
  protected readonly data: ConfirmData = inject(MAT_DIALOG_DATA);

  onConfirm(): void { 
    this.dialogRef.close(true); 
  }
  onCancel(): void  { 
    this.dialogRef.close(false); 
  }

}
