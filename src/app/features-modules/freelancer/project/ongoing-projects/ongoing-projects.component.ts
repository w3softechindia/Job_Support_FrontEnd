/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AdminPostProject } from 'src/app/core/models/models';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-ongoing-projects',
  templateUrl: './ongoing-projects.component.html',
  styleUrls: ['./ongoing-projects.component.scss']
})
export class OngoingProjectsComponent implements OnInit{
  public routes = routes;
  projects:AdminPostProject[]=[];
  email!:string;
  photo: any;
  error: string | undefined;
  isLoading: boolean | undefined;
  userEmail!:string;
  photoUrl: string | undefined;

  constructor(private userService:UserService,private auth:AuthService,private router:Router){}
  
  ngOnInit(): void {
    this.email=this.auth.getEmail();
    this.loadOngoingProjects(this.email);
  }

  private loadOngoingProjects(email:string){
    this.userService.freelancerOnGoingProjects(email).subscribe((data:any)=>{
      this.projects=data;
      if (this.projects.length > 0 && this.projects[0].user?.email) {
        this.userEmail = this.projects[0].user.email;
        this.loadPhoto();
        console.log('Updated userEmail:', this.userEmail); // Debugging
      } else {
        console.error('User email not found in response or response is empty');
      }
    },error=>{
      console.log("No Projects Found..!!!",error)
    })
  }

  fetchProject(id:number){
    console.log(id);
    this.router.navigate(['/freelancer/view-project-detail',id])
  }

  loadPhoto(): void {
    this.userService.getPhoto(this.userEmail).subscribe(
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
