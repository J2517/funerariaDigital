import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Headline } from "src/app/models/headline.model";
import { HeadlineService } from "src/app/services/head-line.service";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  headline: Headline;
  theFormGroup: FormGroup;

  constructor(
    private parent: ActivatedRoute,
    private serviceHeadline: HeadlineService,
    private router: Router,
  ) {
    this.mode = 1;
    this.headline = {
      id: 1,
      customer_id: 1,
      name: "juan",
      email: "example@example.com",
      document: "12345678",
      start_date: "2021-01-01",
      end_date: "2021-12-31",
    };
  }

  ngOnInit(): void {
    const currentUrl = this.parent.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("update")) {
      this.mode = 2;
    } else if (currentUrl.includes("create")) {
      this.mode = 3;
    }

    if (this.parent.snapshot.params.id) {
      this.headline.id = this.parent.snapshot.params.id;
      this.getOwner(this.headline.id);
    }
  }

  beneciaries() {
    this.router.navigate(["headlines", this.headline.id, "beneficiaries"]);
  }

  async getOwner(id: number) {
    this.serviceHeadline.view(id).subscribe((data) => {
      this.headline = data[0];
    });
  }

  create() {
    const headline = {
      customer_id: this.headline.customer_id,
      start_date: this.headline.start_date,
      end_date: this.headline.end_date,
    };
    this.serviceHeadline.create(headline).subscribe(() => {
      this.router.navigate(["owners/list"]);
    });
  }

  update() {
    const headline = {
      id: this.headline.id,
      customer_id: this.headline.customer_id,
      start_date: this.headline.start_date,
      end_date: this.headline.end_date,
    };
    this.serviceHeadline.update(headline).subscribe(() => {
      this.router.navigate(["owners/list"]);
    });
  }
}
