import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Room } from "src/app/models/room.model";
import { RoomService } from "src/app/services/room.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> Visualizar, 2 -> Crear, 3 -> Actualizar
  room: Room;
  theFormGroup: FormGroup;
  trySend: boolean;
  headquearters: any[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private service: RoomService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.room = {
      id: 0,
      room_name:"",
      room_capacity:0,
      facilities:"",
      is_available:true,
      headquearter_id: 0
    };
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      room_name: ["", [Validators.required]],
      room_capacity: ["", [Validators.required, Validators.minLength(1)]],
      facilities: ["", [Validators.required]],
      is_available: ["", [Validators.required]],
      headquearter_id: ["", [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }

    if (this.activateRoute.snapshot.params.id) {
      this.room.id = this.activateRoute.snapshot.params.id;
      this.getRoom(this.room.id);
    }

    this.loadheadquearter();
    this.configFormGroup();

    console.log("MODO -> " + this.mode);
  }

  getRoom(id: number) {
    this.service.view(id).subscribe((data) => {
      this.room = data;
      console.log("SALA ->" + JSON.stringify(this.room));
      this.theFormGroup.patchValue(this.room);
    });
  }

  loadheadquearter() {
    // Aquí iría el servicio para cargar los propietarios
    // Reemplazar el siguiente código de ejemplo con el llamado real al servicio
    this.headquearters = [
      { id: 1, name: 'headquearter 1' },
      { id: 2, name: 'headquearter 2' }
    ];
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Formulario incompleto",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    this.service.create(this.room).subscribe((data) => {
      Swal.fire("Beneficiario creado", "Beneficiario creado con éxito", "success");
      this.router.navigate(["beneficiary/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire(
        "Formulario incompleto",
        "Ingrese correctamente los datos solicitados",
        "error"
      );
      return;
    }
    this.service.update(this.room).subscribe((data) => {
      Swal.fire(
        "Sala actualizada",
        "Sala actualizada con éxito",
        "success"
      );
      this.router.navigate(["beneficiary/list"]);
    });
  }
}

