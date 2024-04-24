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
  constructor(private userService:UserService,private auth:AuthService,private router:Router){}
  
  ngOnInit(): void {
    this.email=this.auth.getEmail();
    this.loadOngoingProjects(this.email);
  }

  private loadOngoingProjects(email:string){
    this.userService.freelancerOnGoingProjects(email).subscribe((data:any)=>{
      this.projects=data;
    },error=>{
      console.log("No Projects Found..!!!",error)
    })
  }

  fetchProject(id:number){
    console.log(id);
    this.router.navigate(['/freelancer/view-project-detail',id])
  }
}
