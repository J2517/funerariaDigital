import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Permission } from "src/app/models/permission.model";
import { PermissionService } from "src/app/services/permission.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  permission: Permission[];

  constructor(private service: PermissionService, private router: Router) {
    this.permission = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe((data) => {
      this.permission = data;
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
    this.router.navigate(["/permission/view", id]);
  }

  update(id: number) {
    this.router.navigate(["/permission/update", id]);
  }

  create() {
    this.router.navigate(["permission/create"]);
  }
}
