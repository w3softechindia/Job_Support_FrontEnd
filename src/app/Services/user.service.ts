import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { AccountDelete } from '../core/models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http:HttpClient){}

  private baseurl="http://localhost:8080";

  login(data:any){
    return this.http.post<any>(`${this.baseurl}/authenticate`,data);
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

  //Update Freelancer Details
  updateFreelancer(email:string,freelancer:User){
    return this.http.put(`${this.baseurl}/updateFreelancer/${email}`,freelancer);
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

  uploadFile(email: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseurl}/upload/${email}`, formData, { responseType: 'text' as 'json' });
  }

  getPhoto(email: string): Observable<any> {
    return this.http.get(`${this.baseurl}/photo/${email}`, { responseType: 'blob' });
  }

  //Delete Skills
  deleteSkill(skill:string){
    return this.http.delete(`${this.baseurl}/deleteSkill/${skill}`);
  }

  //Change Password
  changePassword(email:string,password:string,newPassword:string,user:User){
    return this.http.put(`${this.baseurl}/change-password/${email}/${password}/${newPassword}`,user);
  }

  //Account Deletion Post
  deleteAccount(email:string,acdlt:AccountDelete){
    return this.http.post(`${this.baseurl}/postReason/${email}`,acdlt,{responseType:'text'});
  }
}
