import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-privacy-dialog',
  templateUrl: './privacy-dialog.component.html',
  styleUrls: ['./privacy-dialog.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class PrivacyDialogComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(PrivacyDialogContent);

    dialogRef.afterClosed().subscribe(result => {console.log(`Dialog: ${result}`)})
  }
}

@Component({
  selector: 'app-privacy-dialog-content',
  templateUrl: './privacy-dialog-content.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class PrivacyDialogContent {}
