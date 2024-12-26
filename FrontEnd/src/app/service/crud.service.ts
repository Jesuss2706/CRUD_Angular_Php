import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private API: string = 'http://localhost/CRUD_Angular_Php/backend/empleados/'; // API de PHP Crudo

  constructor(private clientHttp: HttpClient) {}

  public AddEmployee(employeeData: Employee): Observable<any> {
    console.log(employeeData);

    return this.clientHttp.post(this.API + "?insertar=1", employeeData);
  }

  GetEmployees(){
    return  this.clientHttp.get(this.API);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.clientHttp.get(this.API + "?borrar=" + id);
  }

  getEmployee(id: string): Observable<any> {
    return this.clientHttp.get(this.API + "?consultar=" + id);
  }

  editEmployee(id: any,employeeData: Employee): Observable<any> {
    return this.clientHttp.post(this.API + "?actualizar=1"+id, employeeData);
  }
}
