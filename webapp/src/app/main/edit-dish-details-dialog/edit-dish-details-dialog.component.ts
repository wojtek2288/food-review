import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogData } from 'src/app/api/model/details-dialog-data';

@Component({
  selector: 'app-edit-dish-details-dialog',
  templateUrl: './edit-dish-details-dialog.component.html',
  styleUrls: ['./edit-dish-details-dialog.component.css']
})
export class EditDishDetailsDialogComponent implements OnInit {
  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    description: new FormControl('', [Validators.maxLength(500)]),
    imageUrl: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
    price: new FormControl('', [Validators.required, Validators.min(0.01)]),
  });
  constructor(
    public dialogRef: MatDialogRef<EditDishDetailsDialogComponent>,
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
