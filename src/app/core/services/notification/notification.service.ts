import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  openSnackBar(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [`${type}-snackbar`],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
