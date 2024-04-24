
/* eslint-disable no-irregular-whitespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, forkJoin, throwError } from 'rxjs';

import { User } from '../classes/user';

import { PostprojectService } from './postproject.service';

import { AccountDelete, Portfolio } from '../core/models/models';
import { SendProposal } from '../classes/send-proposal';


export interface FileDTO {
  file_path: any;
  id: number;
  filePath: string;
  type: string; // Assuming you have a 'type' property
  size: number;
  fileName: string; // New property to store the file name
}


export interface ApprovedProposalDTO {
  additionalDetails: any;
  

  id: number;
  status: string;
  admin_post_project_id: number;
  freelancer_id: string;
  image: string; // Add this property if it's part of your DTO
  
}



@Injectable({
  providedIn: 'root'
})
export class UserService {
  getProjectById(id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  // private baseurl = "http://jobsupport.us-east-1.elasticbeanstalk.com";
   private baseurl="http://localhost:5000"

  //Authentication
  login(data: any) {
    return this.http.post<any>(`${this.baseurl}/authenticate`, data);
  }

  //Check If User is logged in
  isLoggedIn(): boolean {
    // Retrieve JWT token and user role from localStorage
    const jwtToken = localStorage.getItem('jwtToken');
    const userRole = localStorage.getItem('role');

    // Check if JWT token exists and user role is 'Freelancer'
    return !!jwtToken && userRole === 'Freelancer';
  }

  //User Registration
  register(user: User): Observable<any> {
    return this.http.post(`${this.baseurl}/register`, user);
  }

  //User Email Verification
  verifyAccount(email: string, otp: string, user: User): Observable<any> {
    return this.http.put(`${this.baseurl}/verify/${email}/${otp}`, user);
  }

  //Check Email Already Exists
  checkEmailExists(email: string) {
    return this.http.get<boolean>(`${this.baseurl}/check-email?email=${email}`);
  }

  //Register User Role
  insertRole(email: string, newRole: string): Observable<User> {
    return this.http.put<User>(`${this.baseurl}/update/${email}?newRole=${newRole}`, null)
  }

  // Register User Personal Info
  personalInfo(user: User, email: string) {
    return this.http.put(`${this.baseurl}/persnolInfo/${email}`, user)
  }

  //Register User Data
  userData(email: string, userdata: any): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/addUserData/${email}`, userdata);
  }

  //Register User OtherInfo
  otherInfo(user: User, email: string) {
    return this.http.put(`${this.baseurl}/otherInfo/${email}`, user)
  }


  getUserByMail(email: string) {
    return this.http.get(`${this.baseurl}/getUser/${email}`)
  }

  //Register Employer Info
  employerInfo(email: string, user: User) {
    return this.http.put(`${this.baseurl}/employerInfo/${email}`, user)
  }

  //Update Freelancer Details
  updateFreelancer(email: string, freelancer: User) {
    return this.http.put(`${this.baseurl}/updateFreelancer/${email}`, freelancer);
  }

  //Send Otp to mail
  SendOtp(email: string): Observable<any> {
    return this.http.put(`${this.baseurl}/sendOTP/${email}`,{ responseType: 'text' } );
  }

  //Verify Otp and Mail
  verifyOtpEmail(email: string, otp: string,result:boolean): Observable<any> {
    return this.http.put(`${this.baseurl}/verifyOTP/${email}/${otp}`,result);
  }

  //Reset Password
  resetPwd(email: string, password: string, user: User): Observable<any> {
    return this.http.put(`${this.baseurl}/resetPassword/${email}/${password}`, user)
  }

  //Resend Otp
  resendOTP(email: string) {
    return this.http.put(`${this.baseurl}/regenerate-otp/${email}`, { responseType: 'text' });
  }

  uploadFile(email: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseurl}/upload/${email}`, formData, { responseType: 'text' as 'json' });
  }

  getPhoto(email: string): Observable<any> {
    return this.http.get(`${this.baseurl}/photo/${email}`, { responseType: 'blob' });
  }

  postFormData(email: string, project: any): Observable<any> {
    const url = `${this.baseurl}/addproject/${email}`; // Constructing the URL with the email as part of the path
    return this.http.post<any>(url, project);
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
  deleteSkill(skill: string) {
    return this.http.delete(`${this.baseurl}/deleteSkill/${skill}`);
  }

  //Change Password
  changePassword(email: string, password: string, newPassword: string, user: User) {
    return this.http.put(`${this.baseurl}/change-password/${email}/${password}/${newPassword}`, user);
  }

  //Account Deletion Post
  deleteAccount(email: string, acdlt: AccountDelete) {
    return this.http.post(`${this.baseurl}/postReason/${email}`, acdlt, { responseType: 'text' });
  }

  getProjectsByUserEmail(userEmail: string): Observable<PostprojectService[]> {
    const url = `${this.baseurl}/projects/${userEmail}`;
    return this.http.get<PostprojectService[]>(url);
  }

  getAllProjects(): Observable<any> {
    return this.http.get<any[]>(`${this.baseurl}/getallProjects`);
  }

  getAllAdminProjects(): Observable<any> {
    return this.http.get<any[]>(`${this.baseurl}/getAllAdminProjects`);
  }

  updateAdminProjectDetails(projectId: number, updatedProject: any): Observable<any> {
    return this.http.put<any>(`${this.baseurl}/updateAdminProject/${projectId}`, updatedProject);
  }

  getAdminProjectById(projectIds: number[]): Observable<any[]> {
    // Adjust your HTTP request to accept projectIds
    const requests = projectIds.map(id =>
      this.http.get<any>(`${this.baseurl}/getAdminProjectById/${id}`)
    );
    return forkJoin(requests);
  }

  sendUpdatedProjectIdsToBackend(projectIds: number[]): Observable<string> {
    return this.http.post<string>(`${this.baseurl}/updatedprojectIds`, projectIds);
  }

  getAllUpdatedProjectIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseurl}/gettingupdatedprojectIds`);
  }

  //Get Admin Project By Id
  getProjectByAdminProject(id: number): Observable<any> {
    return this.http.get(`${this.baseurl}/getProjectById/${id}`);
  }

  //Add Portfolio
  addPortfolio(email: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<any>(`${this.baseurl}/postPortfolio/${email}`, formData, { headers: headers })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  //Get Portfolios by Email
  getPortfolio(email: string) {
    return this.http.get(`${this.baseurl}/getPortfolios/${email}`)
  }

  //Get portfolio image
  getImageUrl(portfolio: Portfolio): string {
    // Assuming the backend returns base64 encoded image data
    return 'data:image/jpeg;base64,' + portfolio.imageBytes;
  }

  //Get Portfolios by Email And Title
  getPortfolioByTitle(email: string, title: string) {
    return this.http.get(`${this.baseurl}/getPortByEmail&Title/${email}/${title}`);
  }

  //Update Portfolios By title
  updatePortfolio(email: string, title1: string, formData: FormData) {
    return this.http.put(`${this.baseurl}/updatePortfolio/${email}/${title1}`, formData);
  }

  //Delete Portfolio By Title
  deletePortfolio(email: string, title: string) {
    return this.http.delete(`${this.baseurl}/deletePortfolio/${email}/${title}`, { responseType: 'text' });
  }

  //Get User Account Status
  getAccountStatus(email: string): Observable<any> {
    return this.http.get(`${this.baseurl}/accountStatus/${email}`, { responseType: 'text' });
  }


  removeProjectsFromPublish(projectId: number) {
    const url = `${this.baseurl}/removeProjectFromPublish/${projectId}`;
    return this.http.delete(url, { observe: 'response' });
  }

  //Get Project Files
  getProjectFilesByProjectId(id: number): Observable<any> {
    return this.http.get(`${this.baseurl}/filesGet/${id}`);
  }

  //Post Proposal
  postProposal(id: number, email: string, proposal: SendProposal): Observable<any> {
    return this.http.post(`${this.baseurl}/sendProposal/${id}/${email}`, proposal);
  }

  //Get All Proposals By Email
  getAllProposals(email: string): Observable<any> {
    return this.http.get(`${this.baseurl}/getProposals/${email}`);
  }

  //update Proposal
  updateProposal(id: number, proposal: SendProposal): Observable<any> {
    return this.http.put(`${this.baseurl}/updateProposal/${id}`, proposal);
  }

  //Delete Proposal
  deleteProposal(id: number): Observable<any> {
    return this.http.delete(`${this.baseurl}/deleteProposal/${id}`, { responseType: 'text' });
  }

  //Fetch Proposal By id
  fetchProposal(id: number): Observable<any> {
    return this.http.get(`${this.baseurl}/getProposalById/${id}`);
  }

  //Get all Projects posted by Admin
  getProjects(): Observable<any> {
    return this.http.get<any[]>(`${this.baseurl}/getProjectsOfAdmin`)
  }

  //Get Proposals by ProjectId
  getProposalsByProject(id: number): Observable<any> {
    return this.http.get<any[]>(`${this.baseurl}/getProposalsByProjectId/${id}`);
  }

  //Get project files by Project Id
  getFilesByProjectId(projectId: number): Observable<FileDTO[]> {
    const url = `${this.baseurl}/filesGet/${projectId}`;
    return this.http.get<FileDTO[]>(url);
  }

  //Update Employer Profile Settings
  updateInfoForEmployeerDashBoard(email: string, user: User): Observable<User> {
    const url = `${this.baseurl}/updateInfoForEmployeerDashBoard/${email}`;
    return this.http.put<User>(url, user);
  }

  //   //Update profile Pic
  //   updatePhoto(email: string, photo: File): Observable<any> {
  //     const formData: FormData = new FormData();
  //     formData.append('photo', photo, photo.name);
  //     return this.http.put(`${this.baseurl}/photoUpdate/${email}`,formData);
  //   }

  toggleStatus(projectId: number): Observable<void> {
    const url = `${this.baseurl}/status/toggle/${projectId}`;
    return this.http.put<void>(url, {});
  }

  getFalseids(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/unpublished`);
  }

  getExpiredIds(userEmail: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/expired/${userEmail}`);
  }

  getProjectsByIds(ids: number[]): Observable<any[]> {
    const params = { ids: ids.join(',') }; // Convert array of IDs to comma-separated string
    return this.http.get<any[]>(`${this.baseurl}/getProjectsByIds`, { params });
  }

  updateProjectDeadline(projectId: number, newDeadline: string): Observable<any> {
    const url = `${this.baseurl}/updateProject/${projectId}`;
    return this.http.put(url, { deadline_date: newDeadline });
  }

  getFilesByProjectIdd(projectId: number): Observable<string[]> {
    const url = `${this.baseurl}/filesGet/${projectId}`;
    return this.http.get<string[]>(url);
  }

  updatePhoto(email: string, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', photo, photo.name);

    return this.http.put<any>(`${this.baseurl}/photoUpdate/${email}`, formData);
  }
  
  //Get Freelancer OnGoing Projects
  freelancerOnGoingProjects(email:string): Observable<any>{
    return this.http.get(`${this.baseurl}/onGoingProjects`, { params: { email: email } })
  }



  getAllApprovedProposals(): Observable<ApprovedProposalDTO[]> {
    return this.http.get<ApprovedProposalDTO[]>(`${this.baseurl}/proposalApproval/all`);
  }

  getMainProjectsById(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/getmainProjectId/${projectId}`).pipe(
      catchError(this.handleError)
    );
  }
  
}
