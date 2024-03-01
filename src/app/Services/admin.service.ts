import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../classes/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  private baseurl="http://localhost:8080";

  adminlogin(data:any){
    return this.http.post(`${this.baseurl}/authenticate`,data);
  }

  adminregister(admin:Admin ):Observable<any>{
    return this.http.post(`${this.baseurl}/adminRegister` , admin);
  }
}
