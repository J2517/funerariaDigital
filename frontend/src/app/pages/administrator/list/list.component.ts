import { Component, OnInit } from "@angular/core";
import { AdministratorService } from "../../../services/administrator.service";
import { Administrator } from "../../../models/administrator.model";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  administrator: Administrator[] = [];
  constructor(private service: AdministratorService, private router: Router) {
    this.administrator = [];
  }

  ngOnInit(): void {
    this.list();
  }
  list() {
    this.service.list().subscribe((data) => {
      this.administrator = data;
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
    this.router.navigate(["/administrator/view", id]); // administrator/view/+id
  }

  update(id: number) {
    this.router.navigate(["/administrator/update", id]);
  }
  create() {
    this.router.navigate(["administrator/create"]);
  }
}
