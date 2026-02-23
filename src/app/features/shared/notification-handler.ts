import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationHandler {

  private readonly snackBar = inject(MatSnackBar);

  success(message: string): void {
    this.snackBar.open(`✅ ${message}`, '', {
      duration: 3500,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['snack-success'],
    });
  }

  error(message: string): void {
    this.snackBar.open(`❌ ${message}`, '', {
      duration: 3500,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['snack-error'],
    });
  }
}
