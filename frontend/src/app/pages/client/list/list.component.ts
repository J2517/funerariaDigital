import { Component, OnInit } from "@angular/core";
import { Client } from "src/app/models/client.model";
import { ClientService } from "src/app/services/client.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  client: Client[];

  constructor(private service: ClientService) {
    this.client = [];
  }

  ngOnInit(): void {
    this.list();
  }
  list() {
    this.service.list().subscribe((data) => {
      this.client = data;
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
}
