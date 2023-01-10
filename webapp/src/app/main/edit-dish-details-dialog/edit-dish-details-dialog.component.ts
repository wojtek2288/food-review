import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogData } from 'src/app/api/model/details-dialog-data';
import { Tag } from 'src/app/api/model/tag';
import { TagApiService } from 'src/app/api/tag-api.service';

@Component({
  selector: 'app-edit-dish-details-dialog',
  templateUrl: './edit-dish-details-dialog.component.html',
  styleUrls: ['./edit-dish-details-dialog.component.css']
})
export class EditDishDetailsDialogComponent implements OnInit {
  isLoading$ = this.tagService.isLoading$;
  tags: Tag[] = [];
  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    description: new FormControl('', [Validators.maxLength(500)]),
    imageUrl: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
    price: new FormControl('', [Validators.required, Validators.min(0.01)]),
    tags: new FormControl('')
  });
  constructor(
    public dialogRef: MatDialogRef<EditDishDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData,
    private tagService: TagApiService
  ) {
    console.log(data);
    this.formGroup.patchValue(data);
    if(data.tags)
    {
      this.formGroup.patchValue({
        tags: data.tags.map(x => x.id)
      })
    }
    this.tagService.tags$.subscribe(x => this.tags = x);
  }

  onClick() {
    if(this.formGroup.valid)
    {
      this.dialogRef.close(this.formGroup.getRawValue());
    }
  }

  ngOnInit(): void {
    this.tagService.getTags();
  }
}
