import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "src/app/models/subscription.model";
import { SubscriptionService } from "src/app/services/subscription.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  subscription: Subscription[];
  customerId: string;

  constructor(
    private service: SubscriptionService,
    private parent: ActivatedRoute,
    private router: Router,
  ) {
    this.subscription = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.customerId = this.parent.snapshot.params.idCustomer;
    if (this.customerId) {
      this.service
        .getSubscriptionsByCustomer(this.customerId)
        .subscribe((data: Subscription[]) => {
          console.log(data);
          this.subscription = data;
        });
    } else {
      this.service.list().subscribe((data: Subscription[]) => {
        this.subscription = data;
      });
    }
  }

  create() {
    this.router.navigate([
      "customers",
      this.customerId,
      "subscriptions",
      "create",
    ]);
  }

  view(id: number) {
    this.router.navigate([
      "customers",
      this.customerId,
      "subscriptions",
      "view",
      id,
    ]);
  }

  update(id: number) {
    this.router.navigate([
      "customers",
      this.customerId,
      "subscriptions",
      "update",
      id,
    ]);
  }

  delete(id: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(() => {
          Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
          this.ngOnInit();
        });
      }
    });
  }

  pagos(id: string) {
    this.router.navigate([
      "customers",
      this.customerId,
      "subscriptions",
      id,
      "payments",
      "list",
    ]);
  }
}
