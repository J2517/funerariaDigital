import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Administrator } from "src/app/models/administrator.model";
import { AdministratorService } from "src/app/services/administrator.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->vizualizar, 2->Crear, 3->Actualizar
  administrator: Administrator;
  theFormGroup: FormGroup;
  trySend: boolean;
  constructor(
    private activateRoute: ActivatedRoute,
    private service: AdministratorService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.administrator = {
      id: 0,
      name: "",
      lastName: "",
      email: "",
      password: "",
      number: ""
    };
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      //Primer elemento es el valor por defecto
      //Segundo elemento es la validación
      name: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.minLength(2)]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      number: ["", [Validators.required, Validators.minLength(4)]],
    });
    this.configFormGroup();
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
      this.administrator.id = this.activateRoute.snapshot.params.id;
      this.getAdministrator(this.administrator.id);
    }

    console.log("MODO -> " + this.mode);
  }
  getAdministrator(id: number) {
    this.service.view(id).subscribe((data) => {
      this.administrator = data;
      console.log("ADMINISTRADOR ->" + JSON.stringify(this.administrator));
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
    this.service.create(this.administrator).subscribe((data) => {
      Swal.fire("Administrador creado", "Administrador creado con éxito", "success");
      this.router.navigate(["administrator/list"]);
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
    this.service.update(this.administrator).subscribe((data) => {
      Swal.fire(
        "Administrador actualizado",
        "Administrador actualizado con éxito",
        "success"
      );
      this.router.navigate(["administrators/list"]);
    });
  }
}
