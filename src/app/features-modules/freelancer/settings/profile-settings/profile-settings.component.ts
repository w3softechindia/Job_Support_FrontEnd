/* eslint-disable @typescript-eslint/no-explicit-any */

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AuthService } from 'src/app/core/services/auth/auth.service';
interface data {
  value: string;
}
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  public routes = routes;

  public isCheckboxChecked = true;
  email!: string;
  user!: User;

  profileForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    phonenumber: new FormControl(''),
    dob: new FormControl(''),
    jobtitle: new FormControl(''),
    typeofjob: new FormControl(''),
    description: new FormControl(''),
    facebook: new FormControl(''),
    linkedin: new FormControl(''),
    instagram: new FormControl(''),
    persnolurl: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    postcode: new FormControl(''),
  })

  existingSkills: any[] = [];
  existingEducations: any[] = [];
  existingCertifications: any[] = [];
  existingExperiences: any[] = [];
  existinglanguages: any[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserService,
    private formbuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.email = this.auth.getEmail();
    this.getUserDetails();

    this.profileForm = this.formbuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phonenumber: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      jobtitle: ['', [Validators.required]],
      typeofjob: ['', [Validators.required]],
      description: ['', [Validators.required]],
      facebook: ['', [Validators.required]],
      instagram: ['', [Validators.required]],
      linkedin: ['', [Validators.required]],
      persnolurl: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      skills: this.formbuilder.array([]),
      education: this.formbuilder.array([]),
      certification: this.formbuilder.array([]),
      experience: this.formbuilder.array([]),
      language: this.formbuilder.array([]),
    })
  }

  private getUserDetails() {
    this.userService.getUserByMail(this.email).subscribe(
      (response: any) => {
        this.user = response;

        this.profileForm.patchValue({
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          phonenumber: this.user.phonenumber,
          jobtitle: this.user.jobtitle,
          typeofjob: this.user.typeofjob,
          description: this.user.description,
          facebook: this.user.facebook,
          instagram: this.user.instagram,
          linkedin: this.user.linkedin,
          persnolurl: this.user.persnolurl,
          address: this.user.address,
          city: this.user.city,
          state: this.user.state,
          postcode: this.user.postcode
        });

        // Parse and format dates
        const formattedDOB = this.formatDate(this.user.dob);
        this.profileForm.patchValue({ dob: formattedDOB });

        this.existingSkills = this.user.skills;
        this.populateSkillsForm();
        this.existingEducations = this.user.education;
        this.populateEducationsForm();
        this.existingCertifications = this.user.certification;
        this.populateCertificationsForm();
        this.existingExperiences = this.user.experience;
        this.populateExperiencesForm();
        this.existinglanguages = this.user.language;
        this.populateLanguagesForm();
      },
      (error) => {
        // Handle error if necessary
        console.error('Error fetching user details:', error);
      }
    );
  }

  get skills(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }

  get educations(): FormArray {
    return this.profileForm.get('education') as FormArray;
  }

  get certifications(): FormArray {
    return this.profileForm.get('certification') as FormArray;
  }

  get experiences(): FormArray {
    return this.profileForm.get('experience') as FormArray;
  }

  get languages(): FormArray {
    return this.profileForm.get('language') as FormArray;
  }

  private populateSkillsForm() {
    const skillsFormArray = this.profileForm.get('skills') as FormArray;
    this.existingSkills.forEach(skill => {
      skillsFormArray.push(this.formbuilder.group({
        skill_name: [skill.skill_name, Validators.required], // Adjust the property name as per your data structure
        level: [skill.level, Validators.required]
      }));
    });
  }

  private populateEducationsForm() {
    const educationsFormArray = this.profileForm.get('education') as FormArray;
    this.existingEducations.forEach(education => {
      educationsFormArray.push(this.formbuilder.group({
        degree: [education.degree, Validators.required], // Adjust the property name as per your data structure
        university: [education.university, Validators.required],
        startdate: [new Date(education.startdate).toISOString().substring(0, 10)], // Format the date
        enddate: [new Date(education.enddate).toISOString().substring(0, 10)],
      }));
    });
  }

  private populateCertificationsForm(): void {
    const certificationsFormArray = this.profileForm.get('certification') as FormArray;
    this.existingCertifications.forEach(certification => {
      certificationsFormArray.push(this.formbuilder.group({
        certification: [certification.certification, Validators.required],
        certifiedfrom: [certification.certifiedfrom, Validators.required],
        year: [certification.year, Validators.required],
      }));
    });
  }

  private populateExperiencesForm(): void {
    const experiencesFormArray = this.profileForm.get('experience') as FormArray;
    this.existingExperiences.forEach(experience => {
      experiencesFormArray.push(this.formbuilder.group({
        companyname: [experience.companyname, Validators.required],
        position: [experience.position, Validators.required],
        companystartdate: [experience.companystartdate, Validators.required],
        companyenddate: [experience.companystartdate, Validators.required],
      }));
    });
  }

  private populateLanguagesForm(): void {
    const languagesFormArray = this.profileForm.get('language') as FormArray;
    this.existinglanguages.forEach(language => {
      languagesFormArray.push(this.formbuilder.group({
        language: [language.language, Validators.required],
        chooselevel: [language.chooselevel, Validators.required],
      }));
    });
  }


  addSkill() {
    const skillsFormArray = this.profileForm.get('skills') as FormArray;
    skillsFormArray.push(this.formbuilder.group({
      skill_name: ['', Validators.required],
      level: ['', Validators.required]
    }));
  }
  removeSkill(index: number) {
    const skillsFormArray = this.profileForm.get('skills') as FormArray;
    skillsFormArray.removeAt(index);

    // this.userService.deleteSkill(skillName).subscribe(()=>{
    //   console.log("Skill deleted Successfully");
    // },error=>{
    //   console.log("Error deleting skill:",error);
    // })
  }

  addEducation() {
    const educationsFormArray = this.profileForm.get('education') as FormArray;
    educationsFormArray.push(this.formbuilder.group({
      degree: ['', Validators.required],
      university: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required]
    }));
  }
  removeEducation(index: number) {
    const educationFormArray = this.profileForm.get('education') as FormArray;
    educationFormArray.removeAt(index);
  }

  addCertification() {
    const certificationFormArray = this.profileForm.get('certification') as FormArray;
    // Check if certificationFormArray is defined and not null
    if (certificationFormArray) {
      certificationFormArray.push(this.formbuilder.group({
        certification: ['', Validators.required],
        certifiedfrom: ['', Validators.required],
        year: ['', Validators.required]
      }));
    }
  }
  removeCertification(index: number) {
    const certificationFormArray = this.profileForm.get('certification') as FormArray;
    certificationFormArray.removeAt(index);
  }

  addExperience() {
    const experienceFormArray = this.profileForm.get('experience') as FormArray;
    // Check if experienceFormArray is defined and not null
    if (experienceFormArray) {
      experienceFormArray.push(this.formbuilder.group({
        companyname: ['', Validators.required],
        position: ['', Validators.required],
        companystartdate: ['', Validators.required],
        companyenddate: ['', Validators.required]
      }));
    }
  }
  removeExperience(index: number) {
    const experienceFormArray = this.profileForm.get('experience') as FormArray;
    experienceFormArray.removeAt(index);
  }

  addLanguage() {
    const languageFormArray = this.profileForm.get('language') as FormArray;
    // Check if languageFormArray is defined and not null
    if (languageFormArray) {
      languageFormArray.push(this.formbuilder.group({
        language: ['', Validators.required],
        chooselevel: ['', Validators.required]
      }));
    }
  }
  removeLanguage(index: number) {
    const languageFormArray = this.profileForm.get('language') as FormArray;
    languageFormArray.removeAt(index);
  }

  submitForm() {
    const freelancerData = this.profileForm.value;
    console.log(freelancerData);
    this.userService.updateFreelancer(this.email, freelancerData).subscribe((data) => {
      console.log(data);
      this.getUserDetails();
    }, error => {
      console.log(error);
    })
  }


  selectedList1: data[] = [
    { value: 'Select' },
    { value: 'Full Time' },
    { value: 'Part Time' },
    { value: 'Hourly' },
  ];
  selectedList2: data[] = [
    { value: 'Select' },
    { value: 'Beginner' },
    { value: 'Intermediate' },
    { value: 'Advanced' },
    { value: 'Expert' },
  ];
  selectedList5: data[] = [
    { "value": "Software Developer" },
    { "value": "Web Developer" },
    { "value": "Mobile App Developer" },
    { "value": "Frontend Developer" },
    { "value": "Backend Developer" },
    { "value": "Full-stack Developer" },
    { "value": "Game Developer" },
    { "value": "Embedded Systems Developer" },
    { "value": "Enterprise Application Developer" },
    { "value": "Systems Analyst" },
    { "value": "Systems Administrator" },
    { "value": "Network Engineer" },
    { "value": "Network Administrator" },
    { "value": "Database Administrator" },
    { "value": "Database Developer" },
    { "value": "Cloud Engineer" },
    { "value": "DevOps Engineer" },
    { "value": "Site Reliability Engineer (SRE)" },
    { "value": "IT Security Specialist" },
    { "value": "Cybersecurity Analyst" },
    { "value": "Information Security Engineer" },
    { "value": "Penetration Tester (Ethical Hacker)" },
    { "value": "Security Operations Center (SOC) Analyst" },
    { "value": "Data Scientist" },
    { "value": "Data Analyst" },
    { "value": "Business Intelligence (BI) Developer" },
    { "value": "Machine Learning Engineer" },
    { "value": "Artificial Intelligence (AI) Engineer" },
    { "value": "Robotics Engineer" },
    { "value": "Computer Vision Engineer" },
    { "value": "Natural Language Processing (NLP) Engineer" },
    { "value": "Big Data Engineer" },
    { "value": "Cloud Architect" },
    { "value": "Solution Architect" },
    { "value": "Enterprise Architect" },
    { "value": "IT Project Manager" },
    { "value": "Agile Coach" },
    { "value": "Scrum Master" },
    { "value": "Product Manager" },
    { "value": "Business Analyst" },
    { "value": "Technical Writer" },
    { "value": "UX/UI Designer" },
    { "value": "UI Designer" },
    { "value": "UX Designer" },
    { "value": "Interaction Designer" },
    { "value": "Information Architect" },
    { "value": "Graphic Designer" },
    { "value": "IT Trainer" },
    { "value": "IT Support Specialist" },
    { "value": "Help Desk Technician" },
    { "value": "Desktop Support Engineer" },
    { "value": "Systems Engineer" },
    { "value": "Linux Administrator" },
    { "value": "Windows Administrator" },
    { "value": "VMware Administrator" },
    { "value": "Citrix Administrator" },
    { "value": "IT Auditor" },
    { "value": "IT Compliance Officer" },
    { "value": "IT Procurement Specialist" },
    { "value": "IT Sales Representative" },
    { "value": "IT Recruiter" },
    { "value": "IT Consultant" },
    { "value": "IT Service Delivery Manager" },
    { "value": "IT Service Desk Manager" },
    { "value": "IT Operations Manager" },
    { "value": "IT Director" },
    { "value": "Chief Information Officer (CIO)" },
    { "value": "Chief Technology Officer (CTO)" },
    { "value": "Chief Security Officer (CSO)" },
    { "value": "Chief Data Officer (CDO)" },
    { "value": "Chief Digital Officer (CDO)" },
    { "value": "IT Governance Manager" },
    { "value": "IT Risk Manager" },
    { "value": "IT Strategy Manager" },
    { "value": "IT Vendor Manager" }
  ]

  selectedList6: data[] = [
    { "value": "Beginner" },
    { "value": "Intermediate" },
    { "value": "Advanced" },
    { "value": "Fluent" },
    { "value": "Native" }
  ];
  navigation() {
    location.reload();
  }

  updatePhoto(email: string, photo: File) {
    this.userService.updatePhoto(email, photo).subscribe(
      response => {
        console.log('Photo updated successfully:', response);
        // Handle success response here
      },
      error => {
        console.error('Error updating photo:', error);
        // Handle error response here
      }
    );
  }

  onFileSelected(event: any) {
    const email = this.auth.getEmail();
    const file: File = event.target.files[0];
    if (file) {
      this.updatePhoto(email, file);
    }
  }

  private formatDate(dateStr: string | null): string {
    if (!dateStr) {
      return ''; // Return empty string if dateStr is null
    }

    // Split the date string into its components
    const [day, month, year] = dateStr.split('/');

    // Construct the date object
    const dateObj = new Date(Number(year), Number(month) - 1, Number(day));

    // Check if the date object is valid
    if (isNaN(dateObj.getTime())) {
      console.error(`Invalid date string: ${dateStr}`);
      return ''; // Return empty string if dateObj is invalid
    }

    // Format the date using datePipe.transform
    return this.datePipe.transform(dateObj, 'yyyy-MM-dd') || '';
  }
}
