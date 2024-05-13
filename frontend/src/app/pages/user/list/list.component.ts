import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  users: User[];
  constructor(private service: UserService) {
    this.users = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe((data) => {
      this.users = data;
    });
  }
}
