import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AdminPostProject } from 'src/app/core/models/models';

@Component({
  selector: 'app-view-project-detail',
  templateUrl: './view-project-detail.component.html',
  styleUrls: ['./view-project-detail.component.scss']
})
export class ViewProjectDetailComponent implements OnInit{
  public routes = routes;
  projectId!:number;
  project!:AdminPostProject;
  constructor(private userService:UserService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.projectId=this.route.snapshot.params['id']
    this.fetchProject();
  }

  private fetchProject(){
    this.userService.getProjectByAdminProject(this.projectId).subscribe((data)=>{
      this.project=data;
      console.log(this.project)
    })
  }
}
