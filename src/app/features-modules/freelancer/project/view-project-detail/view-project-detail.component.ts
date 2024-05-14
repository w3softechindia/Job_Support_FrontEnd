/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AdminPostProject } from 'src/app/core/models/models';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-view-project-detail',
  templateUrl: './view-project-detail.component.html',
  styleUrls: ['./view-project-detail.component.scss']
})
export class ViewProjectDetailComponent implements OnInit{
  public routes = routes;
  projectId!:number;
  project!:AdminPostProject;
  photo: any;
  error: string | undefined;
  isLoading: boolean | undefined;
  userEmail!:string;
  photoUrl: string | undefined;
  email!:string;
  constructor(private userService:UserService,private route:ActivatedRoute,private router:Router,private auth:AuthService){}

  ngOnInit(): void {
    this.email=this.auth.getEmail();
    this.projectId=this.route.snapshot.params['id']
    this.fetchProject();
  }

  private fetchProject(){
    this.userService.getProjectByAdminProject(this.projectId).subscribe((data)=>{
      this.project=data;
      this.userEmail=this.project.user.email;
      this.loadPhoto();
      console.log(this.project)
    })
  }

  projectStatus(status: string) {
    this.userService.projectStatus(this.email,this.projectId, status).subscribe(
      (data) => {
        console.log(data); // Handle successful response
        window.location.reload();
      },
      (error) => {
        console.log(error); // Handle error
      }
    );
  }  

  navigation(){
    this.router.navigate(['/freelancer/files',this.projectId]);
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
