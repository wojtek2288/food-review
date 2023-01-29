import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, Subject } from 'rxjs';

export const rowAnimation = trigger('rowAnimation', [ transition('* => void', [ animate('0ms', style({ display: 'none'})) ]) ]);

@Component({
  selector: 'app-base-search',
  templateUrl: './base-search.component.html',
  styleUrls: ['./base-search.component.css'],
  animations: [rowAnimation]
})
export class BaseSearchComponent<T> implements AfterViewInit, OnDestroy {
  @Input() enableAdding: boolean = false;
  unsubscribe$ = new Subject();
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

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  onSearch(): void { }
  onShowDetails(rowData: T): void {}
  onToggleVisibility(rowData: T): void {}
  onAdd(): void {}
  onEdit(rowData: T): void {}
  onDelete(rowData: T): void {}
  onBan(rowData: T): void {}
}