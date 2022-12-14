import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  shouldDisplayButtons:boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn$.subscribe(x => {
      this.shouldDisplayButtons = x;
    });
  }
}
