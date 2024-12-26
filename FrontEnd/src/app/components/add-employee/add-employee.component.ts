import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../service/crud.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  public employeeForm!: FormGroup;

  constructor(
    public form: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.valuesForm();
  }

  private valuesForm(): void {
    this.employeeForm = this.form.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  sendData(): any {
    this.crudService.AddEmployee(this.employeeForm.value).subscribe();
    this.router.navigateByUrl('/list-employee');

  }
}
