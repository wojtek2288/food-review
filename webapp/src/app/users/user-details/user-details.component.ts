import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserDetails } from 'src/app/api/model/user-details';
import { UserApiService } from 'src/app/api/user-api.service';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject();

    isLoading$ = this.userService.isLoading$;
    userId: string = "";
    user: UserDetails = {
        id: this.userId,
        name: "",
        description: "",
        email: "",
        imageUrl: ""
    };

    constructor(
        private route: ActivatedRoute,
        private userService: UserApiService) { }

    ngOnInit(): void {
        this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            this.userId = x['id'];
            this.getDetails();
        });
        this.userService.userDetails$.pipe(takeUntil(this.unsubscribe$)).subscribe(x => this.user = x);
        this.userService.afterCommandFinished$.pipe(takeUntil(this.unsubscribe$)).subscribe(x => this.getDetails());
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(null);
        this.unsubscribe$.complete();
    }


    getDetails(): void {
        this.userService.getUserDetails(this.userId);
    }

    onBan(): void {
        this.userService.banUser(this.userId);
    }
}
