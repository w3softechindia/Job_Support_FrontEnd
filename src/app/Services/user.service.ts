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
 
}
