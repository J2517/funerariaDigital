import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service_execution } from 'src/app/models/service_execution.model';
import { Service_executionService } from 'src/app/services/service_execution.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  service_executions: Service_execution[];
  constructor(
    private service: Service_executionService,
    private router: Router,
  ) {
    this.service_executions = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe((data) => {
      console.log(data);
      this.service_executions = data;
    });
  }

  create() {
    this.router.navigate(["service_executions/create"]);
  }

  view(id: number) {
    this.router.navigate(["service_executions/view", id]);
  }

  update(id: number) {
    this.router.navigate(["service_executions/update", id]);
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar el registro?',
      text: "Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(() => {
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado.',
            'success'
          );
          this.ngOnInit();
        });
      }
    });
  }

}
