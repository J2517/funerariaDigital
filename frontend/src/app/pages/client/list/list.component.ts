import { Component, OnInit } from "@angular/core";
import { Client } from "src/app/models/client.model";
import { ClientService } from "src/app/services/client.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  client: Client[];

  constructor(private service: ClientService) {
    this.client = [];
  }

  ngOnInit(): void {
    this.list();
  }
  list() {
    this.service.list().subscribe((data) => {
      this.client = data;
    });
  }
}
