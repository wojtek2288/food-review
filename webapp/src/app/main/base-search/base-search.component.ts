import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-base-search',
  templateUrl: './base-search.component.html',
  styleUrls: ['./base-search.component.css']
})
export class BaseSearchComponent<T> implements AfterViewInit {
  @Input() enableAdding: boolean = false;
  header: string = "";
  dataSource!: MatTableDataSource<T>;
  displayedColumns: string[] = ['id', 'name', 'description', 'showDetails'];
  sortingField: string = 'id';
  sortingDirection: SortDirection = "asc";
  totalItems: number = 0;
  isLoading$: Observable<boolean> = of(true);
  searchFormControl = new FormControl('');
  constructor() { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('empTbSort') empTbSort = new MatSort();

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(x => this.onSearch());
    this.empTbSort.sortChange.subscribe(x => {
      this.sortingField = x.active;
      this.sortingDirection = x.direction;
      this.onSearch();
    });
    setTimeout(() => this.onSearch());
  }

  onSearch(): void { }
  onShowDetails(rowData: T): void {}
  onToggleVisibility(rowData: T): void {}
  onAdd(): void {}
  onEdit(rowData: T): void {}
  onDelete(rowData: T): void {}
  onBan(rowData: T): void {}
}