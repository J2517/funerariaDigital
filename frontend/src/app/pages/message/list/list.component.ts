import { Component, OnInit } from "@angular/core";
import { MessageService } from "../../../services/message.service";
import { Message } from "../../../models/message.model";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  message: Message[];
  constructor(private service: MessageService, private router: Router) {
    this.message = [];
  }

  ngOnInit(): void {
    this.list();
  }
  list() {
    this.service.list().subscribe((data) => {
      this.message = data;
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
    this.router.navigate(["/message/view", id]); // message/view/+id
  }

  update(id: number) {
    this.router.navigate(["/message/update", id]);
  }

  create() {
    this.router.navigate(["message/create"]);
  }
}
