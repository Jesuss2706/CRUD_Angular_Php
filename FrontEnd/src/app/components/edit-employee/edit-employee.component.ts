import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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
  ) {
    this.elID = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.elID);
    this.crudService.getEmployee(this.elID).subscribe(response => {
      console.log(response);
      this.employeesForm.setValue({
        nombre: response[0]['nombre'],
        correo: response[0]['correo']
      });
    });

    this.employeesForm = this.formulario.group({
      nombre: [''],
      correo: [''],
    });
  }

  sendData():any {
    console.log(this.elID);
    console.log(this.employeesForm.value);
    this.crudService.editEmployee(this.elID,this.employeesForm.value).subscribe(response => {

    });
  }

  ngOnInit(): void {
  }

}
