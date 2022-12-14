import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  constructor(private apiService: ApiService) {
    apiService.loginAdmin("admin", "admin").subscribe(result => {
      console.log(result);
    });
   }

  ngOnInit(): void {
  }

}
