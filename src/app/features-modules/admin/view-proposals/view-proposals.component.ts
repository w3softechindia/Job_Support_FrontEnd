import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { SendProposal } from 'src/app/classes/send-proposal';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-view-proposals',
  templateUrl: './view-proposals.component.html',
  styleUrls: ['./view-proposals.component.scss']
})
export class ViewProposalsComponent implements OnInit {

  proposal:SendProposal[]=[]
  projectId!:number;
  name!:string;
  routes!:routes;
  constructor(private userService:UserService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.projectId=this.route.snapshot.params['id']
    this.viewProposals();
  }

  private viewProposals(){
    this.userService.getProposalsByProject(this.projectId).subscribe((data)=>{
      this.proposal=data;
      this.name=data.user.name;
      console.log(this.proposal);
    })
  }  
}
