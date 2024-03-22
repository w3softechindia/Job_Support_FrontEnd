import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AdminPostProject } from 'src/app/core/models/models';

@Component({
  selector: 'app-project-proposals',
  templateUrl: './project-proposals.component.html',
  styleUrls: ['./project-proposals.component.scss']
})
export class ProjectProposalsComponent implements OnInit {

  adminProject:AdminPostProject[]=[];
  constructor(private userService:UserService,private router:Router){}

  ngOnInit(): void {
    this.fetchAllAdminProjects();
  }

  private fetchAllAdminProjects(){
    this.userService.getProjects().subscribe((data)=>{
      this.adminProject=data;
      console.log(this.adminProject);
    })
  }

  viewProposal(id:number){
    this.router.navigate(['/admin/view-proposals',id])
  }
}
