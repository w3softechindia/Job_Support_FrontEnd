import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../classes/user';

import { PostprojectService } from './postproject.service';

import { AccountDelete } from '../core/models/models';


@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http:HttpClient, private projectservice:PostprojectService){}

  private baseurl="http://localhost:8080";

  //Authentication
  login(data:any){
    return this.http.post<any>(`${this.baseurl}/authenticate`,data);
  }

  //Check User is LoggedIn
  isLoggedIn(): boolean {
    // Check if there's an authentication token in localStorage or sessionStorage
    return !!localStorage.getItem('jwtToken');
  }

  //User Registration
  register(user: User):Observable<any>{
    return this.http.post(`${this.baseurl}/register` , user);
  }
  
  //User Email Verification
  verifyAccount(email:string,otp:string,user:User):Observable<any>{
    return this.http.put(`${this.baseurl}/verify/${email}/${otp}`,user);
  }

  //Register User Role
  insertRole(email:string,newRole:string):Observable<User>{
    return this.http.put<User>(`${this.baseurl}/update/${email}?newRole=${newRole}`,null)
  }

  // Register User Personal Info
  personalInfo(user:User,email:string){
    return this.http.put(`${this.baseurl}/persnolInfo/${email}`,user)
  }

  //Register User Data
  userData(email: string, userdata: any): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/addUserData/${email}`, userdata);
  }

  //Register User OtherInfo
  otherInfo(user:User,email:string){
    return this.http.put(`${this.baseurl}/otherInfo/${email}`,user)
  }

  //Get User Details By email
  getUserByMail(email:string){
    return this.http.get(`${this.baseurl}/getUser/${email}`)
  }

  //Register Employer Info
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

  postFormData(formData: any): Observable<any> {
    const url = `${this.baseurl}/addproject`;
    return this.http.post<any>(url, formData);
  }

  myUpload(projectId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    return this.http.post<any>(`${this.baseurl}/files/${projectId}`, formData, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // Return an observable with a user-facing error message
    return throwError('Something went wrong; please try again later.');
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

  //Add Portfolio
  addPortfolio(email:string,formData:FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<any>(`${this.baseurl}/postPortfolio/${email}`,formData,{ headers: headers })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  //Get Portfolios by Email
  getPortfolio(email:string){
    return this.http.get(`${this.baseurl}/portfolios/${email}`)
  }

  //Get Portfolios by Email And Title
  getPortfolioByTitle(email:string,title:string){
    return this.http.get(`${this.baseurl}/getPortByEmail&Title/${email}/${title}`);
  }

  //Update Portfolios By title
  updatePortfolio(email:string,title1:string,formData:FormData){
    return this.http.put(`${this.baseurl}/updatePortfolio/${email}/${title1}`,formData);
  }

  //Delete Portfolio By Title
  deletePortfolio(email:string,title:string){
    return this.http.delete(`${this.baseurl}/deletePortfolio/${email}/${title}`,{responseType:'text'});
  }

  //Get User Account Status
  getAccountStatus(email:string):Observable<any>{
    return this.http.get(`${this.baseurl}/accountStatus/${email}`,{responseType:'text'});
  }
}
