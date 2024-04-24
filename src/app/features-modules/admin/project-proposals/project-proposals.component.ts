/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { AdminPostProject } from 'src/app/core/models/models';

@Component({
  selector: 'app-project-proposals',
  templateUrl: './project-proposals.component.html',
  styleUrls: ['./project-proposals.component.scss']
})
export class ProjectProposalsComponent implements OnInit {

  adminProject:AdminPostProject[]=[];
  photoUrl: string | undefined;
  isLoading: boolean | undefined;
  photoUrls: any;
  constructor(private userService:UserService,private router:Router){}

  ngOnInit(): void {
    this.fetchAllAdminProjects();
  }

  private fetchAllAdminProjects(){
    this.userService.getProjects().subscribe((data)=>{
      this.adminProject=data;
      const userEmails = this.adminProject.map((adminProject) => adminProject.user.email);
      // Track number of loaded photos
      let loadedPhotos = 0;
      userEmails.forEach((email) => {
        this.loadPhoto(email, () => {
          loadedPhotos++;

          // Check if all photos are loaded
          if (loadedPhotos === userEmails.length) {
            this.isLoading = false;
          }
        });
      });
      console.log(this.adminProject);
    })
  }

  viewProposal(id:number){
    this.router.navigate(['/admin/view-proposals',id])
  }

  loadPhoto(email: string, callback: () => void): void {
    this.userService.getPhoto(email).subscribe(
      (data: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (!this.photoUrls) {
            this.photoUrls = {};
          }
          // Assign the loaded photo URL to the respective email
          this.photoUrls[email] = reader.result as string;
          console.log('Photo URL for', email, ':', this.photoUrls[email]); // Log photo URL
          callback(); // Invoke callback when photo is loaded
        };
        reader.onerror = (error) => {
          console.error('Error reading photo data:', error);
          this.isLoading = false; // Set loading to false on error
        };
        reader.readAsDataURL(data);
      },
      (error: any) => {
        console.error('Error loading photo:', error);
        this.isLoading = false; // Set loading to false on error
      }
    );
  }
}
