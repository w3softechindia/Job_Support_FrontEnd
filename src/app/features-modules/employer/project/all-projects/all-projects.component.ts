import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
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

  publishedProjectIds: string[] = [];
  unpublishedProjectIds: string[] = [];

  public routes = routes
  empprojects: Array<empprojects> = [];
  email!: string;
  projects: PostprojectService[] = [];
  expiredIds!: number[];

  constructor(public router: Router,
    private userservice: UserService,
    private auth: AuthService,
    private viedetailsservice: EmployerProjectIdsForViewProjectService,
    private dataservice: ShareDataService) {
  }

  ngOnInit(): void {

    this.email = this.auth.getEmail();
    this.fetchProjectsAndExpiredIds();

    this.dataservice.ManageUsers.subscribe((data: Array<empprojects>) => {
      this.empprojects = data
    })
  }

  // getEmail(): void {
  //   this.email = this.auth.getEmail();
  //   console.log('email from auth service ' + this.email);

  //   // Check if email is defined before calling getProjectsByEmail
  //   if (this.email != null) {
  //     this.getProjectsByEmail(this.email);
  //   } else {
  //     console.error('Email is undefined');
  //   }
  // }

  // const idsToExclude: number[] = [1,5];
  // this.projects = data.filter(project => !idsToExclude.includes(project['id']));

  // private getProjectsByEmail(email: string): void {
  //   this.userservice.getProjectsByUserEmail(email).subscribe(data => {
  //     // Check if data and expiredIds are defined
  //     if (data && this.expiredIds) {
  //       // Store the projects data
  //       this.projects = data;

  //       // Extract IDs from the projects
  //       const projectIds: number[] = this.projects.map(project => project['id']);

  //       // Filter out projects whose IDs are not in the expiredIds array
  //       const filteredProjects = this.projects.filter(project => !this.expiredIds!.includes(project['id']));

  //       // Assign the filtered projects to this.projects
  //       this.projects = filteredProjects;
  //     } else {
  //       // Handle the case where data or expiredIds are undefined
  //       console.error('Projects data or expired IDs are undefined.');
  //     }
  //   });
  // }

  private fetchProjectsAndExpiredIds(): void {
    forkJoin([
        this.userservice.getProjectsByUserEmail(this.email),
        this.userservice.getExpiredIds(this.email)
    ]).subscribe(([projects, expiredIds]) => {
        if (projects && expiredIds) {
            this.projects = projects.filter(project => !expiredIds.includes(project['id']));
        } else {
            console.error('Projects data or expired IDs are undefined.');
            this.projects = [];
        }
    });
}

  // private fetchExpiredIds(): void {
  //   this.userservice.getexpiredIds().subscribe(ids => {
  //     this.expiredIds = ids;
  //     console.log('expiredprojects', this.expiredIds);

  //     // Filter out expired projects
  //     if (this.projects && this.expiredIds) {
  //       this.projects = this.projects.filter(project => !this.expiredIds.includes(project['id']));
  //     }
  //   });
  // }

  // private getProjectsByEmail(email: string): void {
  //   this.userservice.getProjectsByUserEmail(email).subscribe(data => {
  //     if (data && this.expiredIds) {
  //       const projectIds: number[] = data.map(project => project['id']);
  //       const filteredProjects = data.filter(project => !this.expiredIds.includes(project['id']));
  //       this.projects = filteredProjects;
  //     } else {
  //       console.error('Projects data or expired IDs are undefined.');
  //       // Initialize projects array to prevent undefined behavior
  //       this.projects = [];
  //     }
  //   });
  // }

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




  printProjectDetails(project: any, id: any): void {
    console.log('Selected Project Details:', project);
    console.log("Project ID:", id);


    // Assuming this.userService is an instance of your UserService
    this.userservice.toggleStatus(id).subscribe(
      () => {
        console.log('Project status toggled successfully');
        // Optionally, you can update any UI or perform other actions here after toggling the status
        window.location.reload();

      },
      error => {
        console.error('Error toggling project status:', error);
        // Optionally, handle the error here
      }
    );

  }

  // Inside your component class
  getStatusLabel(status: string): string {
    return status === 'true' ? 'Published' : 'UnPublished';
  }
}