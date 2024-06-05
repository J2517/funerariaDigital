import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Role } from "src/app/models/role.model";
import { RoleService } from "src/app/services/role.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  role: Role[];
  constructor(private service: RoleService, private router: Router) {
    this.role = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe((data) => {
      this.role = data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar registro",
      text: "¿Está seguro que quiere eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "El registro ha sido eliminada correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
  view(id: number) {
    this.router.navigate(["/role/view", id]);
  }

  update(id: number) {
    this.router.navigate(["/role/update", id]);
  }

  create() {
    this.router.navigate(["role/create"]);
  }
}
