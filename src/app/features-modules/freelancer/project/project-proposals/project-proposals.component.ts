import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { SendProposal } from 'src/app/classes/send-proposal';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-project-proposals',
  templateUrl: './project-proposals.component.html',
  styleUrls: ['./project-proposals.component.scss']
})
export class ProjectProposalsComponent implements OnInit {
  public routes = routes;
  email!:string;
  proposals: SendProposal[] = []
  constructor(private auth:AuthService,private userService:UserService){}

  ngOnInit(): void {
    this.email=this.auth.getEmail();
    this.fetchAllProposals();
  }

  private fetchAllProposals(){
    this.userService.getAllProposals(this.email).subscribe((response:any)=>{
      this.proposals=response;
      console.log(this.proposals)
    })
  }
}
