import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-project-confirmation',
  templateUrl: './project-confirmation.component.html',
  styleUrls: ['./project-confirmation.component.scss']
})
export class ProjectConfirmationComponent implements OnInit {
  public routes = routes;



  formData: any = {}; // Object to store form data

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Retrieve form data when the component initializes
    this.captureFormData();
  }

  captureFormData() {
    // Retrieve form data using Angular's template syntax
    this.formData.projectTitle = 'Create desktop applications with source PHP';
    this.formData.category = 'Web development';
    this.formData.projectDuration = '3 Month';
    this.formData.freelancerType = 'Full Time';
    this.formData.freelancerLevel = 'Intermediate';
    this.formData.tags = ['Web Design', 'UI Design', 'Node Js'];
    this.formData.skills = ['Website Mockup', 'Design', 'Figma', 'Sketch'];
    this.formData.budgetType = 'Fixed';
    this.formData.budgetAmount = '$200';
    this.formData.attachmentFiles = '5';
    this.formData.languages = 'English, Arabic';
    this.formData.languageFluency = 'Intermediate';
    this.formData.otherDetails = 'Please provide details such as the topic or subject of the project, the goals and objectives, any specific requirements, and any other relevant information you would like to include in the project description. The more details you provide, the better I can assist you in crafting an accurate and compelling project description.';

    console.log(this.formData); // Log form data to the console

    // Perform any additional actions such as sending data to backend or navigating
    // For example, to navigate to another route:
    // this.router.navigate([this.routes.nextRoute]);
  }
}
  

