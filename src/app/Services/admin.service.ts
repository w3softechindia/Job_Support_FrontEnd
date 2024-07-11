/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../classes/admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  private baseurl="http://jobsupport.us-east-1.elasticbeanstalk.com";
  // private baseurl="http://localhost:5000";

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

  //Count of Users by Role
  getCountOfUsers(role:string):Observable<any>{
    return this.http.get(`${this.baseurl}/totalUsersByRole/${role}`);
  }

  //Count Users By Active
  getCountofUsersByActive(role:string):Observable<any>{
    return this.http.get(`${this.baseurl}/active/${role}`);
  }

  //Count Users By Deactive
  getCountofUsersByDeactive(role:string):Observable<any>{
    return this.http.get(`${this.baseurl}/deactivated/${role}`);
  }

  //Approve Proposal
  approveProposal(proposalId:number,proposalStatus:string,approvalStatus:string){
    return this.http.post(`${this.baseurl}/proposalApproval/${proposalId}/${proposalStatus}/${approvalStatus}`,{responseType:'text'})
  }

  //Reject Proposal
  rejectProposal(proposalId:number,proposalStatus:string){
    return this.http.put(`${this.baseurl}/rejectProposal/${proposalId}/${proposalStatus}`,{responseType:'text'})
  }
}
