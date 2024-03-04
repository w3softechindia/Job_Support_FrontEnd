import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../classes/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  private baseurl="http://localhost:8080";

  adminlogin(email:string,password:string,admin:Admin){
    return this.http.post(`${this.baseurl}/adminLogin/${email}/${password}`,admin);
  }

  adminregister(admin:Admin){
    return this.http.post(`${this.baseurl}/adminRegister` , admin);
  }
}
