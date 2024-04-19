/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostprojectService } from 'src/app/Services/postproject.service';
import { UserService } from 'src/app/Services/user.service';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { empprojects } from 'src/app/core/models/models';

@Component({
  selector: 'app-expired-project',
  templateUrl: './expired-project.component.html',
  styleUrls: ['./expired-project.component.scss']
})
export class ExpiredProjectComponent  implements OnInit{
  
  expiredIds: any[] = [];
  selectedProjectId: number | undefined;

  newDeadline = ''; // Assuming newDeadline is a string in format 'yyyy-MM-ddTHH:mm'
  
  newDeadlineTime = '00:00'; // Initialize with default value


  projects: PostprojectService[] | undefined;
  public routes = routes
  empprojects: Array<empprojects> = [];
  

  // projects: any[] | undefined;
  constructor( 
    public router: Router, 
    private dataservice: ShareDataService,
    private userservice:UserService
  ) {
    this.dataservice.ManageUsers.subscribe((data: Array<empprojects>) => {
      this.empprojects = data
    })
   }

   ngOnInit(): void {
    this.userservice.getexpiredIds().subscribe(ids => {
      this.expiredIds = ids;
      console.log('expiredprojects' + this.expiredIds);
      this.fetchProjectsByIds(this.expiredIds); // Pass the expiredIds array to fetchProjectsByIds
    });
  }
  
  fetchProjectsByIds(ids: number[]): void {
    // Use the ids array received as a parameter
    this.userservice.getProjectsByIds(ids)
      .subscribe(
        (response) => {
          this.projects = response;
          console.log(this.projects)
        },
        (error) => {
          console.error('Error fetching projects:', error);
        }
      );
  }
  
 
    updateDeadline(projectId: any) {
      const projectIdNumber = Number(projectId); // Convert projectId to a number
  
      if (!isNaN(projectIdNumber) && this.newDeadline && this.newDeadlineTime && this.projects) {
        const deadlineDateTime = `${this.newDeadline} ${this.newDeadlineTime}:00`; // Combine date and time
        const formattedDeadline = this.formatDeadline(deadlineDateTime);
  
        // Send PUT request to update project deadline
        this.userservice.updateProjectDeadline(projectIdNumber, formattedDeadline)
          .subscribe(
            updatedProject => {
              console.log('Project deadline updated successfully:', updatedProject);
              // Optionally, you can fetch updated projects data after updating the deadline
              window.location.reload();
            },
            error => {
              console.error('Error updating project deadline:', error);
              // Handle error if needed
            }
          );
      } else {
        console.error('Project ID is not a valid number or new deadline is not provided or projects array is undefined');
      }
    }
  
    // Function to format the deadline to match the expected format by the backend
    formatDeadline(deadline: string): string {
      // Assuming deadline is already in a valid date format, you can directly pass it
      return deadline;
    }
}