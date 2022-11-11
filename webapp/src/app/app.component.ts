import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'webapp';
  name = "placeholder"

  serverAddress = environment.apiURL

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    console.log(`${this.serverAddress}/query/FoodReview.Core.Contracts.Example.ExampleQuery`)
    this.http.get(`${this.serverAddress}/query/FoodReview.Core.Contracts.Example.ExampleQuery`, {headers: headers}).subscribe(response => this.name = (<any>response).name)
  }

}
