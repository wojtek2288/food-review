import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { AuthService } from "../main/auth/auth.service";
import { ApiService } from "./api.service";
import { Tag } from "./model/tag";

@Injectable({
    providedIn: "root",
})
export class TagApiService {
    private isLoadingSubject = new BehaviorSubject<boolean>(true);
    public isLoading$ = this.isLoadingSubject.asObservable();
    private tagsSubject = new Subject<Tag[]>();
    public tags$ = this.tagsSubject.asObservable();

    constructor(private apiService: ApiService, private authService: AuthService) {}

    public getTags()
    {
        this.isLoadingSubject.next(true);
        this.apiService.getTags(this.authService.loggedInUser?.access_token!).subscribe(x => 
        {
            console.log(x)
            this.tagsSubject.next(x);
            this.isLoadingSubject.next(false);
        });
    }
}