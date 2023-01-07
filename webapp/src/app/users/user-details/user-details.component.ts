import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { UserDetails } from 'src/app/api/model/user-details';
import { AuthService } from 'src/app/main/auth/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoadingSubject.asObservable();
  userId: string = "";
  user: UserDetails = {
    id: this.userId,
    name: "",
    description: "",
    email: "",
    imageUrl: ""
  };
  constructor(private route: ActivatedRoute, private apiService: ApiService, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe(x => 
      {
        this.userId = x['id'];
        this.apiService.getUserDetails({
          id: this.userId
        }, this.authService.loggedInUser?.access_token!).subscribe(x => 
          {
            this.user = x;
            this.isLoadingSubject.next(false);
          }, x => {
          this.snackBar.open("User with specified Id does not exist", "", {duration: 3000});
          this.router.navigate(['']);
        });
      });
  }
}
