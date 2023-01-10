import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/api/model/user-details';
import { UserApiService } from 'src/app/api/user-api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  sub1: Subscription | undefined;
  sub2: Subscription | undefined;
  isLoading$ = this.userService.isLoading$;
  userId: string = "";
  user: UserDetails = {
    id: this.userId,
    name: "",
    description: "",
    email: "",
    imageUrl: ""
  };
  constructor(private route: ActivatedRoute, private userService: UserApiService, private router: Router) { 

  }

  ngOnInit(): void {
    this.route.params.subscribe(x => 
      {
        this.userId = x['id'];
        this.getDetails();
      });
      this.sub1 = this.userService.userDetails$.subscribe(x => this.user = x);
      this.sub2 = this.userService.afterCommandFinished$.subscribe(x => this.getDetails());
  }

  getDetails(): void {
    this.userService.getUserDetails(this.userId);
  }

  onBan(): void {
    this.userService.banUser(this.userId);
  }
}
