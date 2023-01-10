import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogData } from 'src/app/api/model/details-dialog-data';
import { Tag } from 'src/app/api/model/tag';
import { TagApiService } from 'src/app/api/tag-api.service';

@Component({
  selector: 'app-edit-details-dialog',
  templateUrl: './edit-restaurant-details-dialog.component.html',
  styleUrls: ['./edit-restaurant-details-dialog.component.css']
})
export class EditRestaurantDetailsDialogComponent implements OnInit {
  isLoading$ = this.tagService.isLoading$;
  tags: Tag[] = [];
  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    description: new FormControl('', [Validators.maxLength(500)]),
    imageUrl: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
    tags: new FormControl('')
  });
  constructor(
    public dialogRef: MatDialogRef<EditRestaurantDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData,
    private tagService: TagApiService
  ) {
    
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
