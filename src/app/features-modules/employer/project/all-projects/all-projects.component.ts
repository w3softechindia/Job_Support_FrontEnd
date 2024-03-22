import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { EmployerProjectIdsForViewProjectService } from 'src/app/Services/employer-project-ids-for-view-project.service';
import { PostprojectService } from 'src/app/Services/postproject.service';
import { UserService } from 'src/app/Services/user.service';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { empprojects } from 'src/app/core/models/models';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})



export class AllProjectsComponent implements OnInit {
  public routes = routes
  empprojects: Array<empprojects> = [];



email:string | undefined;

projects: PostprojectService[] = [];
 

  constructor( public router: Router, 
    private userservice: UserService,
    private auth:AuthService,
  private viedetailsservice:  EmployerProjectIdsForViewProjectService,
    private dataservice: ShareDataService) {
    this.dataservice.ManageUsers.subscribe((data: Array<empprojects>) => {
      this.empprojects = data
    })
   }




   
  ngOnInit(): void {
    this.getEmail();
  }
  

   getEmail(): void {
    this.email = this.auth.getEmail();
    console.log('email from auth service ' + this.email);
  
    // Check if email is defined before calling getProjectsByEmail
    if (this.email !== undefined) {
      this.getProjectsByEmail(this.email);
    } else {
      console.error('Email is undefined');
    }
  }
  





  getProjectsByEmail(email: string): void {
    this.userservice.getProjectsByUserEmail(email).subscribe(data => {
      this.projects = data;
      console.log(this.projects);

    });

  }


//   printProjectId(projectIdForViewProjecdetils: string) {
    
//     const projectIdNumber: number = parseInt(projectIdForViewProjecdetils);

   
//     if (!isNaN(projectIdNumber)) {
//         console.log('Selected Project ID For sending to view Project Details component:', projectIdNumber);
        
      
//         this.viedetailsservice.setProjectId(projectIdNumber);
//     } else {
//         console.error('Invalid project ID:', projectIdForViewProjecdetils);
    
//     }
// }

printProjectId(projectIdForViewProjectDetails: string) {
  // Convert the string to a number
  const projectIdNumber: number = parseInt(projectIdForViewProjectDetails);

  // Check if the conversion was successful
  if (!isNaN(projectIdNumber)) {
    console.log('Selected Project ID For sending to view Project Details component:', projectIdNumber);
    
    // Find the selected project in this.projects
    const selectedProject = this.projects.find(project => project['id'] === projectIdNumber);

    if (selectedProject) {
      // Pass both project ID and project details to the service
      this.viedetailsservice.setSelectedProject({ id: projectIdNumber, details: selectedProject });
    } else {
      console.error('Project not found for ID:', projectIdNumber);
    }
  } else {
    console.error('Invalid project ID:', projectIdForViewProjectDetails);
    // Handle the case where the string is not a valid number
  }
}






























//   printProjectDetails(project: any): void {
//     console.log('Selected Project Details:', project);
// }


  
















   








}