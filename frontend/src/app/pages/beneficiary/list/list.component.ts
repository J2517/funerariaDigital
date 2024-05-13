import { Component, OnInit } from "@angular/core";
import { Beneficiary } from "src/app/models/beneficiary.model";
import { BeneficiaryService } from "src/app/services/beneficiary.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  beneficiary: Beneficiary[];

  constructor(private service: BeneficiaryService) {
    this.beneficiary = [];
  }

  ngOnInit(): void {
    this.list();
  }
  list() {
    this.service.list().subscribe((data) => {
      this.beneficiary = data;
    });
  }
}
