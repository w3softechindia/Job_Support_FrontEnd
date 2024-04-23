/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// import { Subject } from "rxjs";
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Sort } from '@angular/material/sort';
import { apiResultFormat, project } from 'src/app/core/models/models';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { Router } from '@angular/router';
import { PostprojectService } from 'src/app/Services/postproject.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {

  expiredIds!: number[];


  @ViewChild('projectTitleInput') projectTitleInput!: ElementRef<HTMLInputElement>;
  @ViewChild('budgetInput') budgetInput!: ElementRef<HTMLInputElement>;
  // @ViewChild('deadlineInput')deadlineInput!:ElementRef<HTMLInputElement>;
 

  

  selectedProject: any = null;

      
  updatedProperties: any = {};

  public lstProject!: Array<project>;
  public url = 'admin';
  public searchDataValue = '';
  dataSource!: MatTableDataSource<project>;

  // pagination variables
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  public filter = false;

  projects: any[] | undefined;

  userData: any;

  user: User[] | undefined;
  dialog: any;

  
  projectIdForUnbublish: number | undefined;



  updatedProjectIds: number[] = [];
  gettingupdatedProjectIdsforstatus:number[]=[];
  projectIdForSend: any;

  unpublishedArray: number[] = [];
  projectidD: any;


 
 
  
  constructor(
    private data: ShareDataService,
    private userservis: UserService,
    private  router: Router,
    private porjectservice:PostprojectService
  ) {}

  ngOnInit(): void {
    this.getTableData();
    this.getingAllProjectData();
    this.getUpdatedProjectIdsForStatus();
    this.getUnpublishedIds() ;
    
    
  }





  // getingAllProjectData() {
  //   this.userservis.getAllProjects().subscribe((data) => {
  //     this.projects = data;
  //     console.log(this.projects);

  //     // Extract project IDs
  //     const projectIds: number[] = data.map((project: any) => project.id);
  //     console.log('Project IDs:', projectIds);

  //     const extractedProperty = data.map(
  //       (item: { user_email: any }) => item.user_email
  //     );
  //     console.log(extractedProperty);

  //     extractedProperty.forEach((email: string) => {
  //       this.getUserDetailsByEmail(email);
  //     });
  //   });
  // }



  
  getUnpublishedIds() {
    this.userservis.getFalseids().subscribe(
      (data: any) => {
        this.unpublishedArray = data; // Assuming data contains the unpublished IDs
        console.log('UnpublishedIds'+this.unpublishedArray);
      },
      error => {
        console.error('Error fetching unpublished IDs:', error);
        // Optionally, handle the error here
      }
    );
  }
  





  getingAllProjectData() {


    // const projectIdsToFilter = [3]; // Update with your array of project IDs
            
    let projectIdsToFilter: number[] = [];

    this.getUnpublishedIds(); // Call getUnpublishedIds to populate unpublishedArray






      projectIdsToFilter.push(...this.unpublishedArray);
      this.userservis.getAllAdminProjects().subscribe((data) => {
        // Populate projectIdsToFilter with unpublishedArray
        projectIdsToFilter = this.unpublishedArray;

        // Filter out projects with IDs in projectIdsToFilter
        this.projects = data.filter((project: any) => !projectIdsToFilter.includes(project.project_id));
        console.log(this.projects);
    



      console.log(this.projects?.length);

      // Extract project IDs
      const projectIds: number[] = data.map((project: any) => project.id);
      console.log('Project IDs:', projectIds);

        


      const extractedProperty = data.map(
        (item: { user_email: any }) => item.user_email
      );
      console.log(extractedProperty);

      extractedProperty.forEach((email: string) => {
        this.getUserDetailsByEmail(email);
      });
      
    });
    
  }

//project ni ikkada update chestham
logProjectDetails(project: any) {
  console.log('Project Details:', project);
  console.log('Project idD:',project.project_id);


  this.projectidD=project.project_id;
 
  this.selectedProject = project;
}

cancelProjectBacktoEmployer(projectId: number = this.projectidD) {
  this.userservis.toggleStatus(projectId).subscribe(
    () => {
      // Handle success, e.g., show a success message
      console.log('Project status toggled successfully.');
      // You can also update any UI or data related to the toggled project
      window.location.reload();
    },
    error => {
      // Handle error, e.g., show an error message
      console.error('Error toggling project status:', error);
    }
  );


}

// updateProject() {
//   if (this.selectedProject && this.selectedProject.id) {
//     const projectId = this.selectedProject.id;
//     // Call the updateAdminProjectDetails method from the ProjectService
//     this.userservis.updateAdminProjectDetails(projectId, this.selectedProject)
//       .subscribe(updatedProject => {
//         console.log('Project updated successfully:', updatedProject);
//         // Handle success or navigate to another page
//       }, error => {
//         console.error('Error updating project:', error);
//         // Handle error
//       });
//   } else {
//     console.error('No project selected or project ID is missing.');
//   }
// }

updateProject() {
  if (this.selectedProject && this.selectedProject.id) {
    const projectId = this.selectedProject.id;
    
    // Fetch values from template reference variables
    const projectTitle = this.projectTitleInput.nativeElement.value;
    const budgetAmount = this.budgetInput.nativeElement.value;
      // const deadline_date=this.deadlineInput.nativeElement.value;
    // Fetch other form field values similarly
    
    
    // Update selectedProject properties
    this.selectedProject.project_title = projectTitle;
    this.selectedProject.budget_amount = budgetAmount;
    // this.selectedProject.deadline_date=deadline_date;
    // Update other selectedProject properties similarly
    
    // Call the updateAdminProjectDetails method from the ProjectService
    this.userservis.updateAdminProjectDetails(projectId, this.selectedProject)
      .subscribe(updatedProject => {
        console.log('Project updated successfully:', updatedProject);


         // Extract the updated project ID
         const updatedProjectId = updatedProject.id;
         this.handleSuccess(updatedProjectId);
       this.sendUpdatedProjectIdsToBackend();
       alert('published succesfully');
       window.location.reload();
         
               
          // Store the updated project ID in the service
        
        // Handle success or navigate to another page
      }, error => {
        console.error('Error updating project:', error);
        // Handle error
      });
  } else {
    console.error('No project selected or project ID is missing.');
  }

}
  
handleSuccess(updatedProjectId: number) {
  console.log('Updated Project ID:', updatedProjectId);
  this.updatedProjectIds.push(updatedProjectId);


}

sendUpdatedProjectIdsToBackend(): void {
  if (this.updatedProjectIds.length > 0) { // Check if there are project IDs to send
    // Call the service method to send the project IDs to the backend
    this.userservis.sendUpdatedProjectIdsToBackend(this.updatedProjectIds)
      .subscribe(
        (response) => {
          console.log('Updated project IDs sent to backend successfully:', response);
          // Handle success response from backend if needed
          
        },
        (error) => {
          console.error('Error sending updated project IDs to backend:', error);
          // Handle error response from backend if needed
        }
      );
  } else {
    console.error('No updated project IDs to send.');
  }
}

  getUserDetailsByEmail(email: string) {
    this.userservis.getUserByMail(email).subscribe(
      (userData) => {
        // Open a popup or modal to display user details
        console.log(userData);
      },
      (error) => {
        // Handle error if any
        console.error(error);
      }
    );
  }

  getUserDetails(email: string) {
    this.userservis.getUserByMail(email).subscribe(
      (userData) => {
        this.userData = userData;
        console.log(userData); // Display user details in the console
        // You can open a popup or modal here to display user details
        
      },
      (error) => {
        console.error(error); // Handle error if any
      }
    );
  }

  getUpdatedProjectIdsForStatus(): void {
    this.userservis.getAllUpdatedProjectIds().subscribe(data => {
      this.gettingupdatedProjectIdsforstatus = data;
      console.log('gettingupdatedProjectIds for Status', this.gettingupdatedProjectIdsforstatus);
    });

  }

//   unpublishProject(projectId: number): void {
    
//     console.log('Unpublishing project with ID:', projectId);

    
// }

unpublishProject(projectId: number): void {
  // Check if projects is defined
  if (this.projects !== undefined) {
      // Find the project with the matching projectId
      const project = this.projects.find((project: any) => project.id === projectId);

      // Check if project is found
      if (project !== undefined) {
          console.log('Unpublishing AdminSelected project with ID:', projectId);
          console.log('getting projectIdForSend to backend' ,project.project_id);
          
          this.projectIdForSend = project.project_id;
            // Pass projectIdForSend to deleteProjectById method
        this.removeProjectsFromPublish(this.projectIdForSend);
        window.location.reload();
          console.log('Project Details:', project);
          // Here you can add the logic to unpublish the project, such as sending a request to the server
          // For example:
          // this.userservis.unpublishProject(projectId).subscribe(response => {
          //     // Handle response
          //     console.log('Project unpublished successfully:', response);
          // });
      } else {
          console.log('Project with ID', projectId, 'not found.');
      }
  } else {
      console.log('Projects data is undefined.');
  }
  
}

removeProjectsFromPublish(projectId: number): void {
  this.userservis.removeProjectsFromPublish(projectId).subscribe(
    (response) => {
      console.log('Project with ID', projectId, 'project removed from publish successfully:', response);
     
      // Handle success response here
    },
    (error) => {
      console.error('Error deleting project with ID', projectId, ':', error);
      // Handle error response here
    }
  );
}

  //Filter toggle
  openFilter() {
    this.filter = !this.filter;
  }
  // Get hostel List  Api Call

  private getTableData(): void {
    this.lstProject = [];
    this.serialNumberArray = [];

    this.data.loadProject().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: project, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.lstProject.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<project>(this.lstProject);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  public sortData(sort: Sort) {
    const data = this.lstProject.slice();

    if (!sort.active || sort.direction === '') {
      this.lstProject = data;
    } else {
      this.lstProject = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];

        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.lstProject = this.dataSource.filteredData;
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData();
  }

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
}

export interface pageSelection {
  skip: number;
  limit: number;
}