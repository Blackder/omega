import { ErrorHandler } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

export class GlobalErrorHandler implements ErrorHandler {
  constructor(private matDialog: MatDialog) {}

  handleError(error: any): void {
    this.matDialog.open(ErrorDialogComponent, {
      data: {
        error,
      },
    });
  }
}
