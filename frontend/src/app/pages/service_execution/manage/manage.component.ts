import { Component, OnInit } from "@angular/core";
import {FormGroup, FormsModule} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Service_execution } from "src/app/models/service_execution.model";
import { Service_executionService } from "src/app/services/service_execution.service";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class ManageComponent implements OnInit {
  mode: number;
  service_Execution: Service_execution;
  FormGroup: FormGroup;

  constructor(
    private service: Service_executionService,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.mode = 1;
    this.service_Execution = {
      id: 1,
      service_id: 1,
      customer_id: 1,
    };
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    const currentUrl = this.parent.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    if (this.parent.snapshot.params.id) {
      this.service_Execution.id = this.parent.snapshot.params.id;
      this.getServiceExecution(this.service_Execution.id);
    }
  }

  getServiceExecution(id: number) {
    this.service.view(id).subscribe((data: Service_execution) => {
      this.service_Execution = data;
    });
  }

  create() {
    this.service.create(this.service_Execution).subscribe(() => {
      this.router.navigate(["service_executions/list"]);
    });
  }

  update() {
    this.service.update(this.service_Execution).subscribe(() => {
      this.router.navigate(["service_executions/list"]);
    });
  }

  chats() {
    this.router.navigate([
      "customers",
      this.service_Execution.customer_id,
      "servicee_xecutions",
      this.service_Execution.id,
      "chats",
    ]);
  }

  messages() {
    this.router.navigate([
      "customers",
      this.service_Execution.customer_id,
      "service_executions",
      this.service_Execution.id,
      "messages",
    ]);
  }
}
