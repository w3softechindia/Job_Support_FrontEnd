import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selectedProposalId!: number; 
  sendProposal!:SendProposal;

  proposalForm:FormGroup=new FormGroup({
    proposedPrice:new FormControl(''),
    estimatedDelivery:new FormControl(''),
    coverLetter:new FormControl('')
  })

  existingMilestones:any[]=[];
  constructor(private auth:AuthService,private userService:UserService,private formBuilder:FormBuilder,private router:Router){}

  ngOnInit(): void {
    this.email=this.auth.getEmail();
    this.fetchAllProposals();

    this.proposalForm=this.formBuilder.group({
      proposedPrice:['',[Validators.required]],
      estimatedDelivery:['',[Validators.required]],
      coverLetter:['',[Validators.required]],
      milestones:this.formBuilder.array([])
    })
  }

  private fetchAllProposals(){
    this.userService.getAllProposals(this.email).subscribe((response:any)=>{
      this.proposals=response;
      console.log(this.proposals)
    })
  }

  private fetchProposal(){
    this.userService.fetchProposal(this.selectedProposalId).subscribe((data)=>{
      this.sendProposal=data;
      console.log(this.sendProposal);

      this.proposalForm.patchValue({
        proposedPrice:this.sendProposal.proposedPrice,
        estimatedDelivery:this.sendProposal.estimatedDelivery,
        coverLetter:this.sendProposal.coverLetter,
      });

      this.existingMilestones=this.sendProposal.milestones;
      this.populateMilestonesForm();
    })
  }

  get milestones(): FormArray {
    return this.proposalForm.get('milestones') as FormArray;
  }

  private populateMilestonesForm() {
    const milestonesFormArray = this.proposalForm.get('milestones') as FormArray;
    this.existingMilestones.forEach(mile => {
      milestonesFormArray.push(this.formBuilder.group({
        milestone_name: [mile.milestone_name, Validators.required], // Adjust the property name as per your data structure
        price: [mile.level, Validators.required],
        startdate:[mile.startdate, Validators.required],
        enddate:[mile.enddate, Validators.required]
      }));
    });
  }

  addMilestone() {
    const milestonesFormArray = this.proposalForm.get('milestones') as FormArray;
    milestonesFormArray.push(this.formBuilder.group({
        milestone_name: ['', Validators.required], // Adjust the property name as per your data structure
        price: ['', Validators.required],
        startdate:['', Validators.required],
        enddate:['', Validators.required]
      }));
  }
  removeMilestone(index: number) {
    const milestonesFormArray = this.proposalForm.get('milestones') as FormArray;
    milestonesFormArray.removeAt(index);
  }

  openEditModal(proposalId: number) {
    this.selectedProposalId = proposalId;
    console.log(this.selectedProposalId);
    this.fetchProposal();
  }

  updateProposal(){
    this.sendProposal=this.proposalForm.value;
    this.userService.updateProposal(this.selectedProposalId,this.sendProposal).subscribe((response)=>{
      console.log(response);
    })
  }

  deleteProposal(){
    this.userService.deleteProposal(this.selectedProposalId).subscribe(()=>{
      console.log("Proposal Deleted Successfully...!!!");
      location.reload();
    })
  }

  fetchProject(id:number){
    console.log(id);
    this.router.navigate(['/freelancer/view-project-detail',id])
  }
}
