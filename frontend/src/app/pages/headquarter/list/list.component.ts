import { Component, OnInit } from "@angular/core";
import { HeadquarterService } from "../../../services/head-quarter.service";
import { Headquarter } from "../../../models/headquarter.model";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  campus: Headquarter[];
  constructor(private service: HeadquarterService, private router: Router) {
    this.campus = [];
  }

  ngOnInit(): void {
    this.list();
  }
  list() {
    this.service.list().subscribe((data) => {
      this.campus = data;
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
    this.router.navigate(["/campus/view", id]); // head-quarter/view/+id
  }

  update(id: number) {
    this.router.navigate(["/campus/update", id]);
  }

  create() {
    this.router.navigate(["campus/create"]);
  }
}
