import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseSearchComponent } from 'src/app/main/base-search/base-search.component';
import { User } from '../model/user.interface';

@Component({
  selector: 'app-user-search',
  templateUrl: '../../main/base-search/base-search.component.html',
  styleUrls: ['../../main/base-search/base-search.component.css']
})
export class UserSearchComponent extends BaseSearchComponent<User> implements OnInit {
  constructor() {
    super();
    this.dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
    this.displayedColumns = ['id', 'name', 'description', 'showDetails'];
  }

  ngOnInit(): void {
    this.header = "Users";
    this.dataSource.filterPredicate = (user, filter) => user.name.toLowerCase().includes(filter.toLowerCase()) || 
      user.description.toLowerCase().includes(filter.toLowerCase());
  }

  override onSearch(): void {
    this.dataSource.filter = this.searchFormControl.value;
  }
}

const ELEMENT_DATA: User[] = [
  {id: "a4edcbc9-ad80-44e4-a576-3b4d17fb65b1", name: 'adam', description: "Opis użytkownika 1"},
  {id: "277ae622-5e42-42f9-995f-18524f1aecbf", name: 'karol', description: "Inny opis 2"},
  {id: "0ea4f8b8-a3f2-47f2-ba5b-0b7b34c9692f", name: 'krzysztof', description: "Ciekawy opis 3"},
  {id: "b5401d41-bc23-4f3d-996d-337666401b42", name: 'rupert', description: "Mniej ciekawy opis 4"},
  {id: "9698ecb8-fbda-439b-90a5-e3c6889c17c0", name: 'florian', description: "Jeszcze inny opis 5"},
  {id: "7926b35b-ac00-4d59-93b1-6eecf7106c1c", name: 'rudolf', description: "Istotnie różny opis 6"},
  {id: "54c806bd-7e78-4eca-b53b-383f12597d87", name: 'rembrandt', description: "Niespodziewany opis 7"},
  {id: "23083280-7be4-47fa-a979-8ccee9fd8bd4", name: 'admin', description: "Administrator"},
];