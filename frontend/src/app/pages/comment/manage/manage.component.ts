import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Theater } from "src/app/models/theater.model";
import { TheaterService } from "src/app/services/theater.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->vizualizar, 2->Crear, 3->Actualizar
  theater: Theater;
  theFormGroup: FormGroup;
  trySend: boolean;
  constructor(
    private activateRoute: ActivatedRoute,
    private service: TheaterService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.theater = {
      id: 0,
      capacity: 0,
      location: "",
    };
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      //Primer elemento es el valor por defecto
      //Segundo elemento es la validación
      capacity: [
        0,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      location: ["", [Validators.required, Validators.minLength(2)]],
    });
    this.configFormGroup();
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
  // getTheaterData() {
  //   this.theater.capacity = this.getTheFormGroup.capacity.value;
  //   this.theater.location = this.getTheFormGroup.location.value;
  // }
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
      this.theater.id = this.activateRoute.snapshot.params.id;
      this.getTheater(this.theater.id);
    }

    console.log("MODO -> " + this.mode);
  }
  getTheater(id: number) {
    this.service.view(id).subscribe((data) => {
      this.theater = data;
      console.log("TEATRO ->" + JSON.stringify(this.theater));
    });
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
    this.service.create(this.theater).subscribe((data) => {
      Swal.fire("Teatro creado", "Teatro creado con éxito", "success");
      this.router.navigate(["theaters/list"]);
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
    this.service.update(this.theater).subscribe((data) => {
      Swal.fire(
        "Teatro actualizado",
        "Teatro actualizado con éxito",
        "success"
      );
      this.router.navigate(["theaters/list"]);
    });
  }
}
