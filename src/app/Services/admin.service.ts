import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../classes/admin';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  private baseurl="http://localhost:8080";

  //Login
  adminlogin(email:string,password:string,admin:Admin){
    return this.http.post(`${this.baseurl}/adminLogin/${email}/${password}`,admin);
  }

  //Register
  adminregister(admin:Admin){
    return this.http.post(`${this.baseurl}/adminRegister` , admin);
  }

  //Get all Users By Role
  getAllByRole(role:string){
    return this.http.get(`${this.baseurl}/getAllUsers/${role}`);
  }

  //Update User Status
  updateStatus(email: string, status: string): Observable<any> {
    return this.http.put(`${this.baseurl}/changeStatus/${email}?status=${status}`, null);
  }  

  //Delete User By Email
  deleteUser(email:string):Observable<any>{
    return this.http.delete(`${this.baseurl}/deleteUser/${email}`, {responseType:'text'});
  }

  //Get Users By Role and Status
  getUsersByStatus(role:string,status:string):Observable<any>{
    return this.http.get(`${this.baseurl}/getAllUsersByStatus/${role}/${status}`);
  }
}
