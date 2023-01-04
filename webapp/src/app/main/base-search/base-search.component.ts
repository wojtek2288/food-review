import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-base-search',
  templateUrl: './base-search.component.html',
  styleUrls: ['./base-search.component.css']
})
export class BaseSearchComponent<T> implements AfterViewInit {
  header: string = "";
  dataSource!: MatTableDataSource<T>;
  displayedColumns: string[] = ['id', 'name', 'description', 'showDetails'];
  searchFormControl = new FormControl('');
  constructor() { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('empTbSort') empTbSort = new MatSort();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.empTbSort;
    this.paginator.page.subscribe(x => this.onSearch())
    this.empTbSort.sortChange.subscribe(x => this.onSearch());
    this.onSearch();
  }

  onSearch()
  {
  }
}