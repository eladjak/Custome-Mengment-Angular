import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div mat-dialog-title class="dialog-title">{{ data.title }}</div>
    <mat-dialog-content class="dialog-content">
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">ביטול</button>
      <button mat-button color="warn" [mat-dialog-close]="true">אישור</button>
    </mat-dialog-actions>
  `,
  styles: [`
    :host {
      display: block;
    }
    .dialog-title {
      margin: 0;
      padding: 16px;
      background: #f5f5f5;
      font-size: 20px;
      font-weight: 500;
    }
    .dialog-content {
      padding: 20px 16px;
      font-size: 16px;
    }
    mat-dialog-actions {
      padding: 8px 16px;
      margin-bottom: 0;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }
  `],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
