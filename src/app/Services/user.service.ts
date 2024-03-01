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

  login(data:any){
    return this.http.post(`${this.baseurl}/authenticate`,data);
  }

  register(user: User):Observable<any>{
    return this.http.post(`${this.baseurl}/register` , user);
  }
  
  verifyAccount(email:string,otp:string,user:User):Observable<any>{
    return this.http.put(`${this.baseurl}/verify/${email}/${otp}`,user);
  }

  insertRole(email:string,newRole:string):Observable<User>{
    return this.http.put<User>(`${this.baseurl}/update/${email}?newRole=${newRole}`,null)
  }

  personalInfo(user:User,email:string){
    return this.http.put(`${this.baseurl}/persnolInfo/${email}`,user)
  }

  userData(email: string, userdata: any): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/addUserData/${email}`, userdata);
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



  //Send Otp to mail
  SendOtp(email:string,user:User):Observable<any>{
    return this.http.put(`${this.baseurl}/sendOTP/${email}`,user);
  }

  //Verify Otp and Mail
  verifyOtpEmail(email:string,otp:string,result:boolean):Observable<any>{
    return this.http.put(`${this.baseurl}/verifyOTP/${email}/${otp}`,result);
  }

  //Reset Password
  resetPwd(email:string,password:string,user:User):Observable<any>{
    return this.http.put(`${this.baseurl}/resetPassword/${email}/${password}`,user)
  }

  //Resend Otp
  resendOTP(email:string){
    return this.http.put(`${this.baseurl}/regenerate-otp/${email}`,{responseType:'text'});
  }

}
