/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostprojectService } from 'src/app/Services/postproject.service';
import { UserService } from 'src/app/Services/user.service';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CompletedProjects } from 'src/app/core/models/models';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pending-projects',
  templateUrl: './pending-projects.component.html',
  styleUrls: ['./pending-projects.component.scss']
})
export class PendingProjectsComponent implements OnInit {
  public routes = routes;
  empprojects: Array<PostprojectService> = [];
  useremail!: string;
  completedProjects: CompletedProjects[] = [];
  projectIds: number[] = [];

  expiredIds: any[] = [];

  constructor(
    public router: Router,
    private dataservice: ShareDataService,
    private userservice: UserService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getCompletedProjects();
    this.getExpiredProjectIds();
  }

  getUser() {
    this.useremail = this.auth.getEmail();
    console.log(this.useremail);
  }

  // getAllProjectsByEmail() {
  //   this.userservice.getProjectsByUserEmail(this.useremail).subscribe(
  //     (dataa) => {
  //       // Filter out projects whose id matches any in this.projectIds
  //       this.empprojects = dataa.filter(project => !this.projectIds.includes(project['id']));
  //       console.log(this.empprojects);
  //     },
  //     (error) => {
  //       console.error('Error fetching projects:', error);
  //     }
  //   );
  // }




  // / Method to get all projects by email and filter out expired and completed ones
  getAllProjectsByEmail() {
    this.userservice.getProjectsByUserEmail(this.useremail).subscribe(
      (dataa) => {
        // Filter out projects whose id matches any in this.projectIds (completed) or this.expiredIds (expired)
        this.empprojects = dataa.filter(project =>
          !this.projectIds.includes(project['id']) && !this.expiredIds.includes(project['id'])
        );
        console.log(this.empprojects);
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
















  getCompletedProjects() {
    this.userservice.getCompletedProjectsByEmployerEmail(this.useremail).subscribe(
      (data: CompletedProjects[]) => {
        console.log('Data received:', data); // Debugging log
        this.completedProjects = data;
        this.projectIds = data.map(project => project.project_id);
        console.log('Project IDs:', this.projectIds); // Debugging log
        this.getAllProjectsByEmail(); // Fetch all projects after getting completed projects
      },
      (error) => {
        console.error('Error fetching completed projects:', error);
      }
    );
  }

  getExpiredProjectIds(): void {
    this.userservice.getExpiredIds(this.useremail).subscribe(
      (ids: number[]) => {
        this.expiredIds = ids;
        console.log('expiredprojects', this.expiredIds);
      },
      (error) => {
        console.error('Error fetching expired project IDs', error);
      }
    );
  }


}
