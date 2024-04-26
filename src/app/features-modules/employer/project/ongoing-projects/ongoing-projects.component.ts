import { HttpClient } from '@angular/common/http';
import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { PostprojectService } from 'src/app/Services/postproject.service';
import { ApprovedProposalDTO, UserService } from 'src/app/Services/user.service';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { empprojects } from 'src/app/core/models/models';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-ongoing-projects',
  templateUrl: './ongoing-projects.component.html',
  styleUrls: ['./ongoing-projects.component.scss']
})
export class OngoingProjectsComponent  implements OnInit{
  public routes = routes
  empprojects: Array<empprojects> = [];

  userEmail: string | null = null;
  approvedProposals: ApprovedProposalDTO[] = [];

  postproject:PostprojectService[]=[];

  isLoading: boolean | undefined;
  photoUrl: string | undefined;

  showProposals = false;

  i = 0; // Define 'i' as a property and initialize it

  constructor( public router: Router, private dataservice: ShareDataService,
                         private user:UserService,
                         public auth:AuthService,
                         

  ) {

  }
   


 
  
  



 
  // ngOnInit(): void {
  //   this.user.getAllApprovedProposals().subscribe(
  //     (data: ApprovedProposalDTO[]) => {
  //       this.approvedProposals = data;
        
  //       if (this.approvedProposals.length > 0) {
  //         const projectIds = this.approvedProposals.map(proposal => proposal.admin_post_project_id);
  //         this.user.getAdminProjectById(projectIds).subscribe(
  //           (projectDetails: any[]) => {
  //             // Handle project details
  //             console.log("Project Details:", projectDetails);
  //             const userEmail = this.auth.getEmail(); // Assuming this method returns the user's email
  //             const userProjects = projectDetails.filter(detail => detail.user_email === userEmail);
  //             userProjects.forEach(project => {
  //               console.log("User Email:", project.user_email);
  //               console.log("Main Project ID:", project.project_id);

  //               // Fetch main project details
  //               this.user.getMainProjectsById(project.project_id).subscribe(
  //                 (mainProjectDetails: any) => {
  //                   console.log("Main Project Details:", mainProjectDetails);
  //                 },
  //                 (error) => {
  //                   console.error('Error fetching main project details:', error);
  //                 }
  //               );
  //             });
  //           },
  //           (error) => {
  //             console.error('Error fetching project details:', error);
  //           }
  //         );
  //       } else {
  //         console.log("No approved proposals available.");
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching approved proposals:', error);
  //     }
  //   );
  // }












  // ngOnInit(): void {
  //   this.user.getAllApprovedProposals().subscribe(
  //     (data: ApprovedProposalDTO[]) => {
  //       this.approvedProposals = data;

  //       if (this.approvedProposals.length > 0) {
  //         const projectIds = this.approvedProposals.map(proposal => proposal.admin_post_project_id);
  //         this.user.getAdminProjectById(projectIds).subscribe(
  //           (projectDetails: any[]) => {
  //             // Handle project details
  //             console.log("Project Details:", projectDetails);
  //             const userEmail = this.auth.getEmail(); // Assuming this method returns the user's email
  //             const userProjects = projectDetails.filter(detail => detail.user_email === userEmail);
  //             userProjects.forEach(project => {
  //               console.log("User main Email:", project.user_email);
  //               console.log("Main Project ID:", project.project_id);

  //               // Fetch main project details
  //               this.user.getMainProjectsById(project.project_id).subscribe(
  //                 (mainProjectDetails: any) => {
  //                   console.log("Main Project Details:", mainProjectDetails);

  //                   // Add main project details to the postproject array
  //                   this.postproject.push(mainProjectDetails);
  //                 },
  //                 (error) => {
  //                   console.error('Error fetching main project details:', error);
  //                 }
  //               );
  //             });
  //           },
  //           (error) => {
  //             console.error('Error fetching project details:', error);
  //           }
  //         );
  //       } else {
  //         console.log("No approved proposals available.");
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching approved proposals:', error);
  //     }
  //   );
  // }







  ngOnInit(): void {
    this.user.getAllApprovedProposals().subscribe(
      (data: ApprovedProposalDTO[]) => {
        this.approvedProposals = data;

        if (this.approvedProposals.length > 0) {
          const projectIds = this.approvedProposals.map(proposal => proposal.admin_post_project_id);
          this.user.getAdminProjectById(projectIds).subscribe(
            (projectDetails: any[]) => {
              // Handle project details
              console.log("Project Details:", projectDetails);
              projectDetails.forEach(project => {
                console.log("Main Project ID:", project.project_id);

                // Fetch main project details
                this.user.getMainProjectsById(project.project_id).subscribe(
                  (mainProjectDetails: any) => {
                    console.log("Main Project Details:", mainProjectDetails);

                    // Add main project details to the postproject array
                    this.postproject.push(mainProjectDetails);
                  },
                  (error) => {
                    console.error('Error fetching main project details:', error);
                  }
                );
              });
            },
            (error) => {
              console.error('Error fetching project details:', error);
            }
          );
        } else {
          console.log("No approved proposals available.");
        }
      },
      (error) => {
        console.error('Error fetching approved proposals:', error);
      }
    );
  }

  isUserAuthorized(userEmail: string): boolean {
    const authEmail = this.auth.getEmail(); // Assuming this method returns the user's authenticated email
    return userEmail === authEmail;
  }
}