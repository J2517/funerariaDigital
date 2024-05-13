import { Component, OnInit } from "@angular/core";
import { Driver } from "src/app/models/driver.model";
import { DriverService } from "src/app/services/driver.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  driver: Driver[];

  constructor(private service: DriverService) {
    this.driver = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe((data) => {
      this.driver = data;
    });
  }
}
