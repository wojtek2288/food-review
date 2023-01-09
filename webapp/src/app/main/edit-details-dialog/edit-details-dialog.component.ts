import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogData } from 'src/app/api/model/details-dialog-data';

@Component({
  selector: 'app-edit-details-dialog',
  templateUrl: './edit-details-dialog.component.html',
  styleUrls: ['./edit-details-dialog.component.css']
})
export class EditDetailsDialogComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    description: new FormControl('', [Validators.maxLength(500)]),
    imageUrl: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
  });
  constructor(
    public dialogRef: MatDialogRef<EditDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData,
  ) {
    console.log(data);
    this.formGroup.patchValue(data);
  }

  onClick() {
    if(this.formGroup.valid)
    {
      this.dialogRef.close(this.formGroup.getRawValue());
    }
  }

  ngOnInit(): void {
  }
}
