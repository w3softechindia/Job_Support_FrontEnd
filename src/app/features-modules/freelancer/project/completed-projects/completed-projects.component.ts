/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CompletedProjects } from 'src/app/core/models/models';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-completed-projects',
  templateUrl: './completed-projects.component.html',
  styleUrls: ['./completed-projects.component.scss']
})
export class CompletedProjectsComponent implements OnInit {
  email!: string;
 finishedProjects!: CompletedProjects[];
  photo: any;
  error: string | undefined;
  isLoading: boolean | undefined;
  userEmail!: string;
  photoUrl: string | undefined;
  constructor(private auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.email = this.auth.getEmail();
    this.completedProjects();
    }
  public routes = routes;

  private completedProjects() {
    this.userService.completedProjects(this.email).subscribe(
      (data: any) => {
          console.log("Data received:", data);
          this.finishedProjects = data;
          this.finishedProjects.forEach(project => {
              this.loadPhoto(project);
          });
      },
      (error: any) => {
          console.log("Error occurred while fetching completed projects:", error);
      }
  );
  }

  loadPhoto(project: CompletedProjects): void {
    this.userService.getPhoto(project.employer).subscribe(
      (data: Blob) => {
        console.log('Photo data:', data);
        const reader = new FileReader();
        reader.onload = () => {
          this.photoUrl = reader.result as string;
          console.log('Photo URL:', this.photoUrl);
          this.isLoading = false; // Set loading to false when image is loaded
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
