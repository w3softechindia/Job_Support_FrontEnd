import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http:HttpClient){}

  private baseurl="http://localhost:8080";

  register(user: User):Observable<any>{
    return this.http.post(`${this.baseurl}/register` , user);
  }
 
  insertRole(email:string,newRole:string):Observable<User>{
    return this.http.put<User>(`${this.baseurl}/update/${email}?newRole=${newRole}`,null)
  }

  personalInfo(user:User,email:string){
    return this.http.put(`${this.baseurl}/persnolInfo/${email}`,user)
  }

  userData(email:string){
    return this.http.post(`${this.baseurl}/addUserData/${email}`, {responseType:'text'})
  }

  otherInfo(user:User,email:string){
    return this.http.put(`${this.baseurl}/otherInfo/${email}`,user)
  }

  getUserByMail(email:string){
    return this.http.get(`${this.baseurl}/getUser/${email}`)
  }

  employerInfo(email:string,user:User){
    return this.http.put(`${this.baseurl}/employerInfo/${email}`,user)
  }
}
