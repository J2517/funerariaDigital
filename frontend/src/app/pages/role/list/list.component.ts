import { Component, OnInit } from "@angular/core";
import { Role } from "src/app/models/role.model";
import { RoleService } from "src/app/services/role.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  role: Role[];
  constructor(private service: RoleService) {
    this.role = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe((data) => {
      this.role = data;
    });
  }
}
