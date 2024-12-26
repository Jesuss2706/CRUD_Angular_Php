import { Component, OnInit } from '@angular/core';

import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  Employees: any;

  constructor(
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.crudService.GetEmployees().subscribe(response => {
      console.log(response);
      this.Employees = response;
    });
  }

  deleteRegister(id: string, iControl: any) {
    if(window.confirm('Are you sure you want to delete?')){
      this.crudService.deleteEmployee(id).subscribe((response) => {
        this.getAllEmployees();
      });
    }
  }

}
