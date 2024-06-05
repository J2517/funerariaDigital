import { Component, OnInit } from "@angular/core";
import { SepultureService } from "../../../services/sepulture.service";
import { Sepulture } from "../../../models/sepulture.model";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  sepulture: Sepulture[];
  constructor(private service: SepultureService, private router: Router) {
    this.sepulture = [];
  }

  ngOnInit(): void {
    this.list();
  }
  list() {
    this.service.list().subscribe((data) => {
      this.sepulture = data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar registro",
      text: "Está seguro que quiere eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "El registro ha sido eliminado correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
  view(id: number) {
    this.router.navigate(["/sepulture/view", id]); // sepulture/view/+id
  }

  update(id: number) {
    this.router.navigate(["/sepulture/update", id]);
  }

  create() {
    this.router.navigate(["sepulture/create"]);
  }
}
