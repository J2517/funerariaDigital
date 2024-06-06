import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> Visualizar, 2 -> Crear, 3 -> Actualizar
  user: User;
  theFormGroup: FormGroup;
  trySend: boolean;
  roles: any[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private service: UserService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.user = {
      id: 0,
      name: "",
      email: "",
      role_id: 0,
    };
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      role_id: ["", [Validators.required]],
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
      this.user.id = this.activateRoute.snapshot.params.id;
      this.getUser(this.user.id);
    }

    this.loadRoles();
    this.configFormGroup();

    console.log("MODO -> " + this.mode);
  }

  getUser(id: number) {
    this.service.view(id).subscribe((data) => {
      this.user = data;
      console.log("USUARIO ->" + JSON.stringify(this.user));
      this.theFormGroup.patchValue(this.user);
    });
  }

  loadRoles() {
    // Aquí iría el servicio para cargar los propietarios
    // Reemplazar el siguiente código de ejemplo con el llamado real al servicio
    this.roles = [
      { id: 1, name: 'role 1' },
      { id: 2, name: 'role 2' }
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
    this.service.create(this.user).subscribe((data) => {
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
    this.service.update(this.user).subscribe((data) => {
      Swal.fire(
        "Beneficiario actualizado",
        "Beneficiario actualizado con éxito",
        "success"
      );
      this.router.navigate(["beneficiary/list"]);
    });
  }

  protected readonly User = User;
}

