import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-privacy-dialog',
  templateUrl: './privacy-dialog.component.html',
  styleUrls: ['./privacy-dialog.component.scss'],
})
export class PrivacyDialogComponent {


  isAccepted: boolean = false
  @Output() termsAccepted = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(PrivacyDialogContent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isAccepted = true
        this.termsAccepted.emit(true)
      } else {
        this.isAccepted = false
        this.termsAccepted.emit(false)
      }

    })
  }
}

@Component({
  selector: 'app-privacy-dialog-content',
  templateUrl: './privacy-dialog-content.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class PrivacyDialogContent { 
  
}
