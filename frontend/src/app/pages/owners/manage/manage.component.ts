import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Owner } from "src/app/models/owner.model";
import { OwnerService } from "src/app/services/owner.service";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number;
  owner: Owner;
  theFormGroup: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private serviceOwner: OwnerService,
    private router: Router
  ) {
    this.mode = 1;
    this.owner = {
      id: 1,
      customer_id: 1,
      start_date: new Date('2021-01-01'),
      end_date: new Date('2021-12-31'),
    };
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("update")) {
      this.mode = 2;
    } else if (currentUrl.includes("create")) {
      this.mode = 3;
    }

    if (this.activateRoute.snapshot.params.id) {
      this.owner.id = this.activateRoute.snapshot.params.id;
      this.getOwner(this.owner.id);
    }
  }

  beneficiaries() {
    this.router.navigate(["owners", this.owner.id, "beneficiaries"]);
  }

  getOwner(id: number) {
    this.serviceOwner.view(id).subscribe((data) => {
      this.owner = data;
    });
  }

  create() {
    const newOwner = {
      customer_id: this.owner.customer_id,
      start_date: this.owner.start_date,
      end_date: this.owner.end_date,
    };
    this.serviceOwner.create(newOwner).subscribe(() => {
      this.router.navigate(["owners/list"]);
    });
  }

  update() {
    const updatedOwner = {
      id: this.owner.id,
      customer_id: this.owner.customer_id,
      start_date: this.owner.start_date,
      end_date: this.owner.end_date,
    };
    this.serviceOwner.update(updatedOwner).subscribe(() => {
      this.router.navigate(["owners/list"]);
    });
  }
}

