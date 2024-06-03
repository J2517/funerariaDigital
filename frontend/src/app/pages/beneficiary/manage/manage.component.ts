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
  mode: number; // 1 -> Visualizar, 2 -> Crear, 3 -> Actualizar
  beneficiary: Beneficiary;
  theFormGroup: FormGroup;
  trySend: boolean;
  owners: any[] = [];
  customers: any[] = [];

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
      owner_id: 0,
      customer_id: 0,
      age: "",
    };
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      owner_id: ["", [Validators.required]],
      customer_id: ["", [Validators.required]],
      age: ["", [Validators.required, Validators.minLength(1)]],
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
      this.beneficiary.id = this.activateRoute.snapshot.params.id;
      this.getBeneficiary(this.beneficiary.id);
    }

    this.loadOwners();
    this.loadCustomers();
    this.configFormGroup();

    console.log("MODO -> " + this.mode);
  }

  getBeneficiary(id: number) {
    this.service.view(id).subscribe((data) => {
      this.beneficiary = data;
      console.log("BENEFICIARIO ->" + JSON.stringify(this.beneficiary));
      this.theFormGroup.patchValue(this.beneficiary);
    });
  }

  loadOwners() {
    // Aquí iría el servicio para cargar los propietarios
    // Reemplazar el siguiente código de ejemplo con el llamado real al servicio
    this.owners = [
      { id: 1, name: 'Owner 1' },
      { id: 2, name: 'Owner 2' }
    ];
  }

  loadCustomers() {
    // Aquí iría el servicio para cargar los clientes
    // Reemplazar el siguiente código de ejemplo con el llamado real al servicio
    this.customers = [
      { id: 1, name: 'Customer 1' },
      { id: 2, name: 'Customer 2' }
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
      this.router.navigate(["beneficiary/list"]);
    });
  }
}

