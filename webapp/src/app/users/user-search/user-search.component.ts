import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserApiService } from 'src/app/api/user-api.service';
import { BaseSearchComponent } from 'src/app/main/base-search/base-search.component';
import { User } from '../model/user.interface';

@Component({
    selector: 'app-user-search',
    templateUrl: '../../main/base-search/base-search.component.html',
    styleUrls: ['../../main/base-search/base-search.component.css']
})
export class UserSearchComponent extends BaseSearchComponent<User> {
    constructor(
        private userService: UserApiService,
        private router: Router) {
        super();
        this.dataSource = new MatTableDataSource<User>();
        this.displayedColumns = ['id', 'username', 'description', 'userButtons'];
        this.header = "Users";
        this.isLoading$ = this.userService.isLoading$;
        this.userService.afterCommandFinished$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.onSearch()
        });
        this.userService.users$.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            this.dataSource.data = x.items;
            this.paginator.length = x.totalCount;
        });
    }

    override onSearch(): void {
        this.userService.getUsers({
            sortingField: this.sortingField,
            sortingDirection: this.sortingDirection,
            pageCount: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize,
            searchPhrase: this.searchFormControl.value,
        });
    }

    override onShowDetails(rowData: User): void {
        this.router.navigate(['users', 'details', rowData.id]);
    }

    override onBan(rowData: User): void {
        this.userService.banUser(rowData.id);
    }
}
