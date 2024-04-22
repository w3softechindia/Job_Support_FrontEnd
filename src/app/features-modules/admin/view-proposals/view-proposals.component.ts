import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
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
  constructor(private userService:UserService,private route:ActivatedRoute,private adminService:AdminService){}

  ngOnInit(): void {
    this.projectId=this.route.snapshot.params['id']
    this.viewProposals();
  }

  private viewProposals(){
    this.userService.getProposalsByProject(this.projectId).subscribe((data)=>{
      this.proposal=data;
      // this.name=data.user.name;
      console.log(this.proposal);
    })
  }  

  approveProposal(proposalId:number,proposalStatus:string,approvalStatus:string){
    this.adminService.approveProposal(proposalId,proposalStatus,approvalStatus).subscribe((data)=>{
      console.log(data);
      // alert("Approved Succesfully..!!!")
      // window.location.reload();
    },error=>{
      console.log(error);
    })
  }

  rejectProposal(proposalId: number, proposalStatus: string) {
   this.adminService.rejectProposal(proposalId,proposalStatus).subscribe(()=>{
    window.location.reload();
   },error=>{
    console.log(error);
   })
  }
  
  
   // Function to open the hire modal
   openHireModal(freelancerName: string) {
    this.name = freelancerName; // Set the name for the modal
    // // Open the hire modal
    // const hireModal: HTMLElement | null = document.getElementById('hire-now');
    // if (hireModal) {
    //   hireModal.classList.add('show');
    //   hireModal.style.display = 'block';
    // }
  }

  navigation():void{
    window.location.reload();
  }
}
