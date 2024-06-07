/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompletedProjects, Review, UserService } from 'src/app/Services/user.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-completed-projects',
  templateUrl: './completed-projects.component.html',
  styleUrls: ['./completed-projects.component.scss']
})
export class CompletedProjectsComponent implements OnInit {
  public routes = routes;
  empprojects: CompletedProjects[] = [];


  freelancer = ''; 
  ProjectId!:number;
  project_title!:string;

  reviewText = ''; // Property to capture review text
  

  constructor(
    public router: Router,
    private userservice: UserService,
    private auth:AuthService
  ) {}

  ngOnInit(): void {
    // const employerEmail = 'mailto:amanriyajmulla786@gmail.com'; 
    const employerEmail = this.auth.getEmail(); 
    console.log('Component initialized, fetching data for email:', employerEmail); // Debugging log

    this.userservice.getCompletedProjectsByEmployerEmail(employerEmail).subscribe(
      (data: CompletedProjects[]) => {
        console.log('Data received:', data); // Debugging log
        this.empprojects = data;
      },
      (error) => {
        console.error('Error fetching completed projects', error);
      }
    );
  }


 

  logProjectDetails(emp: any) {
    const { employer, freelancer, project_id,project_title} = emp;
    console.log('Selected Project Details:', emp);
    console.log('Employer:', employer);
    console.log('Freelancer:', freelancer);
    console.log('Project ID:', project_id);
    console.log('Project ID:', project_title);


    this.freelancer = freelancer;
     this.ProjectId =project_id;
     this.project_title=project_title;
  }


  getSelectdProjectDeatailToWriteReview(){
    console.log('coming'+ this.freelancer);
    console.log('coming'+ this.ProjectId);
    console.log('coming'+ this.project_title);
    console.log('Review Text:', this.reviewText); // Log the review text
    
     this.sendReviwesToBackend();
  }


  sendReviwesToBackend() {
    // Get the email from AuthService
    const email = this.auth.getEmail(); // Assuming getEmail method returns the email address
    
    // Create a Review object with project details and review text
    const review: Review = {
      id: 0, // Initialize id to 0
      freelancer: this.freelancer,
      project_id: this.ProjectId,
      project_title: this.project_title,
      review_text: this.reviewText,
      email: email
    };
  
    // Call the createReview method to send the review to the backend
    this.userservice.createReview(review, email).subscribe(
      response => {
        console.log('Review sent successfully:', response);
        // Handle success response if needed
        this.reviewText = ''; // Clear the review text after successful submission
        window.location.reload();
      },
      error => {
        console.error('Error sending review:', error);
        // Handle error if needed
      }
    );
  }
  
  
}