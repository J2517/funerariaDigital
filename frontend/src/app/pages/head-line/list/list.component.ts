import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Headline } from "src/app/models/headline.model";
import { HeadlineService } from "src/app/services/head-line.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  headlines: Headline[];
  constructor(
    private service: HeadlineService,
    private route: Router,
  ) {
    this.headlines = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe((data: Headline[]) => {
      this.headlines = data;
    });
  }

  // on click, navigate to owners/:id/beneficiaries
  beneficiaries(id: string) {
    this.route.navigate(["owners", id, "beneficiaries"]);
  }

  create() {
    this.route.navigate(["owners/create"]);
  }

  view(id: number) {
    this.route.navigate(["owners/view", id]);
  }

  update(id: number) {
    this.route.navigate(["owners/update", id]);
  }

  delete(id: number) {
    Swal.fire({
      title: "¿Estás seguro de eliminar el registro?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(() => {
          Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
          this.ngOnInit();
        });
      }
    });
  }
}
