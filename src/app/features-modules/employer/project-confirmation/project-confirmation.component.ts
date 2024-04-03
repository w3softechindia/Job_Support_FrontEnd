/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostprojectService } from 'src/app/Services/postproject.service';

import { UserService } from 'src/app/Services/user.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-project-confirmation',
  templateUrl: './project-confirmation.component.html',
  styleUrls: ['./project-confirmation.component.scss']
})
export class ProjectConfirmationComponent implements OnInit {
  public routes = routes;
  email!: string;  

  deadline_date: string | undefined; 
  
  activeRate = ''; // Assuming activeRate is a property for selecting the budget type
  hourlyRateFrom :string | undefined; // Assuming hourlyRateFrom is a property for hourly rate from
  hourlyRateTo :string | undefined; // Assuming hourlyRateTo is a property for hourly rate to
  fixedRate = 0; // Assuming fixedRate is a property for fixed rate
  attachments: any[] = []; // Assuming attachments is an array of attached files
     date:Date | undefined;

 
  skills: string[] = [];
  
 
  tags: string[] = [];
  files: File[] = [];
 
  formData: any = {};
  projectId: number | undefined;
 

  constructor(private router: Router,
    private projectservice:PostprojectService,
    private userService: UserService,
    private auth:AuthService,
  
    
    ) { }

  


  ngOnInit(): void {
      
    this.email = this.auth.getEmail();
    console.log('Email coming from authserviceeee:', this.email);
    
    console.log(this.email);
    this.captureFormData();
  }



 

  captureFormData() {
    this.setFormDataProperty('project_title', this.projectservice.project_title);
    this.setFormDataProperty('project_category', this.projectservice.project_category);
    this.setFormDataProperty('project_duration', this.projectservice.project_duration);
     this.setFormDataProperty('deadline_date' , this.projectservice.deadline_date);
    this.setFormDataProperty('freelancer_type', this.projectservice.freelancer_type);
    this.setFormDataProperty('freelancer_level', this.projectservice.freelancer_level);
    this.setFormDataProperty('attachmentFiles', this.projectservice.attachmentFiles);
    this.setFormDataProperty('languages', this.projectservice.languages);
    this.setFormDataProperty('language_fluency', this.projectservice.language_fluency);
    this.setFormDataProperty('description', this.projectservice.description);
    this.setFormDataProperty('number_of_files', this.projectservice.number_of_files);
    this.setFormDataProperty('active_rate', this.projectservice.active_rate);
    this.setFormDataProperty('tags', this.projectservice.getTags());
    this.setFormDataProperty('skills', this.projectservice.getSkills());
    this.setFormDataProperty('attachments', this.projectservice.getAttachments());
     
    


    // Log selected budget type and related rates
    console.log('Selected Budget Type:', this.projectservice.active_rate);
    if (this.projectservice.active_rate === 'hourly') {
      console.log(
        'Hourly Rate - From:',
        this.projectservice.hourly_rate_from,
        'To:',
        this.projectservice.hourly_rate_to
      );
      // Check if hourly rates are set
      if (this.projectservice.hourly_rate_from !== undefined && this.projectservice.hourly_rate_to !== undefined) {
        // Assign hourly rates to formData
        this.setFormDataProperty('budget_amount', this.projectservice.hourly_rate_from + ' - ' + this.projectservice.hourly_rate_to);
      } else {
        console.log('Hourly rates are not set properly.');
      }
    } else if (this.projectservice.active_rate === 'fixed') {
      console.log('Fixed Budget:', this.projectservice.fixed_rate);
      // Assign fixed rate to formData
      this.setFormDataProperty('budget_amount', this.projectservice.fixed_rate);
    }
    console.log(this.formData);
  }

  setFormDataProperty(propertyName: string, propertyValue: any) {
    // Check if formData is initialized and define property dynamically
    if (this.formData) {
      this.formData[propertyName] = propertyValue;
    }
  }


 

  someOtherMethod() {
    console.log('Email coming from auth service:', this.email);
  }




  






  postFormData() {
    // Assuming this.formData contains the form data
    this.userService.postFormData(this.email, this.formData).subscribe(
      response => {
        console.log('Form data sent successfully:', response);
        const projectId = response.id; // Extract project ID from the response
        if (projectId) {
          try {
            const files = this.projectservice.getAttachments(); // Get the files
            if (files && files.length > 0) {
              // Call the file upload method if files are available
              this.sendFiles(Number(projectId), files); // Convert projectId to number
            } else {
              console.error('No files to upload.');
            }
          } catch (error) {
            console.error('Error retrieving attachments:', error);
          }
        } else {
          console.error('Project ID not provided.');
        }
      },
      error => {
        console.error('Error occurred while sending form data:', error);
      }
    );
  }
  
  sendFiles(projectId: number, files: File[]) {
    // Iterate over each file and upload it
    files.forEach(file => {
      this.userService.myUpload(projectId, file).subscribe(
        (data: any) => {
          console.log('File uploaded successfully:', data);
          // Assuming the response is plain text, you can handle it here
          console.log('Server response:', data);
          // Handle success response here
        },
        (error: any) => {
          console.error('Error uploading file:', error);
          // Handle error response here
        }
      );
    });
  }
  
  getfiles() {
    try {
      this.files = this.projectservice.getAttachments();
      console.log('Files:', this.files);
      // Call sendingFiles method after getting files
      
    } catch (error) {
      console.error('Error retrieving attachments:', error);
    }
  }

  navigation(){
    this.router.navigate(['/employer/dashboard'])
  }
}