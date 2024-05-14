import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Beneficiary } from "src/app/models/beneficiary.model";
import { BeneficiaryService } from "src/app/services/beneficiary.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->vizualizar, 2->Crear, 3->Actualizar
  beneficiary: Beneficiary;
  theFormGroup: FormGroup;
  trySend: boolean;
  constructor(
    private activateRoute: ActivatedRoute,
    private service: BeneficiaryService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.trySend = false;
    this.mode = 1;
    this.beneficiary = {
      id: 0,
      name: "",
      email: "",
      password: "",
      headLine_id: 0
    };
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      //Primer elemento es el valor por defecto
      //Segundo elemento es la validación
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.minLength(2)]],
      password: ["", [Validators.required, Validators.minLength(4)]]
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
      this.beneficiary.id = this.activateRoute.snapshot.params.id;
      this.getBeneficiary(this.beneficiary.id);
    }

    console.log("MODO -> " + this.mode);
  }
  getBeneficiary(id: number) {
    this.service.view(id).subscribe((data) => {
      this.beneficiary = data;
      console.log("BENEFICIARIO ->" + JSON.stringify(this.beneficiary));
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
    this.service.create(this.beneficiary).subscribe((data) => {
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
    this.service.update(this.beneficiary).subscribe((data) => {
      Swal.fire(
        "Beneficiario actualizado",
        "Beneficiario actualizado con éxito",
        "success"
      );
      this.router.navigate(["beneficiaries/list"]);
    });
  }
}
