import { Component, OnInit } from "@angular/core";
import { Permission } from "src/app/models/permission.model";
import { PermissionService } from "src/app/services/permission.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  permission: Permission[];

  constructor(private service: PermissionService) {
    this.permission = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe((data) => {
      this.permission = data;
    });
  }
}
