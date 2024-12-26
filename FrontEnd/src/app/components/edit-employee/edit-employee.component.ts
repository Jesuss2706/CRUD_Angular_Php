import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employeesForm: FormGroup;
  elID: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private crudService: CrudService,
    private formulario: FormBuilder,
    private router: Router
  ) {
    // Obtén el ID del empleado desde la URL
    this.elID = this.activeRoute.snapshot.paramMap.get('id');

    // Inicializa el formulario antes de usarlo
    this.employeesForm = this.formulario.group({
      nombre: [''],
      correo: [''],
    });

    // Obtén los datos del empleado y establece los valores en el formulario
    this.crudService.getEmployee(this.elID).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.employeesForm.setValue({
          nombre: response[0]?.nombre || '',
          correo: response[0]?.correo || '',
        });
      },
      error: (err) => {
        console.error('Error al obtener empleado:', err);
      }
    });
  }

  ngOnInit(): void {
  }

  sendData(): void {
    this.crudService.editEmployee(this.elID, this.employeesForm.value).subscribe(() => {
      this.router.navigate(['/list-employee']);
    });
  }
}
