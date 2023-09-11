import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private matDialog: MatDialog) {}

  handleError(error: any): void {
    console.error(error);
    this.matDialog.open(ErrorDialogComponent, {
      data: {
        error: error.message,
      },
    });
  }
}
