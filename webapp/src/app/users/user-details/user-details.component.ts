import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { UserDetails } from 'src/app/api/model/user-details';
import { UserApiService } from 'src/app/api/user-api.service';
import { AuthService } from 'src/app/main/auth/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  isLoading$ = this.userService.isLoading$;
  userId: string = "";
  user: UserDetails = {
    id: this.userId,
    name: "",
    description: "",
    email: "",
    imageUrl: ""
  };
  constructor(private route: ActivatedRoute, private userService: UserApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(x => 
      {
        this.userId = x['id'];
        this.getDetails();
      });
      this.userService.userDetails$.subscribe(x => this.user = x);
      this.userService.afterCommandFinished$.subscribe(x => this.getDetails());
  }

  getDetails(): void {
    this.userService.getUserDetails(this.userId);
  }

  onBan(): void {
    this.userService.banUser(this.userId);
  }
}
