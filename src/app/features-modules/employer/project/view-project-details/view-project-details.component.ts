import { Component, OnInit } from '@angular/core';
import { EmployerProjectIdsForViewProjectService } from 'src/app/Services/employer-project-ids-for-view-project.service';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-view-project-details',
  templateUrl: './view-project-details.component.html',
  styleUrls: ['./view-project-details.component.scss']
})
export class ViewProjectDetailsComponent implements OnInit {

public routes = routes

projectDetails: any;

projectId: number | null | undefined; // Change type to accept null

constructor(private projectIdService: EmployerProjectIdsForViewProjectService) { }



ngOnInit() {
  // Subscribe to changes in the selected project
  this.projectIdService.getSelectedProject().subscribe((project: { id: number | null | undefined; details: any; }) => {
    this.projectId = project.id;
    this.projectDetails = project.details; // Store project details

              
    console.log('Project ID received in ViewProjectDetailsComponent:', this.projectId);
    console.log('Project details received in ViewProjectDetailsComponent:', this.projectDetails);
    // Now you can use this.projectId and this.projectDetails in your component


    
  });
  
}
}

   






