import { Component, OnInit } from "@angular/core";
import { Accountholder } from "src/app/models/accountholder.model";
import { AccountHolderService } from "src/app/services/account-holder.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  accountHolder: Accountholder[];

  constructor(private service: AccountHolderService) {
    this.accountHolder = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe((data) => {
      this.accountHolder = data;
    });
  }
}
