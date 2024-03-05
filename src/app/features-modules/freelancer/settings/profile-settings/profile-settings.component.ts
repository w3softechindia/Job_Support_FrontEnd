
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
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';
  public selectedValue6 = '';
  public selectedValue7 = '';
  public selectedValue8 = '';
  public selectedValue9 = '';
  public customvalue1 = '';

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
    private formbuilder: FormBuilder) { }

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
      personalUrl: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      skills: this.formbuilder.array([]),
      educations: this.formbuilder.array([]),
      certifications: this.formbuilder.array([]),
      experiences: this.formbuilder.array([]),
      languages: this.formbuilder.array([]),
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
          dob: this.user.dob,
          jobtitle: this.user.jobtitle,
          typeofjob: this.user.typeofjob,
          description: this.user.description,
        })

        this.existingSkills = this.user.skills,
        this.existingEducations = this.user.educations,
        this.existingCertifications = this.user.certifications,
        this.existingExperiences = this.user.experiences,
        this.existinglanguages = this.user.languages
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
    return this.profileForm.get('educations') as FormArray;
  }

  get certifications(): FormArray {
    return this.profileForm.get('certifications') as FormArray;
  }

  get experiences(): FormArray {
    return this.profileForm.get('experiences') as FormArray;
  }

  get languages(): FormArray {
    return this.profileForm.get('languages') as FormArray;
  }

  addSkill() {
    this.existingSkills.forEach(skill => {
      this.skills.push(this.formbuilder.group({
        skills: [skill.skills],
        level: [skill.level]
      }));
    });
  }
  removeSkills(index: number) {
    this.skills.removeAt(index);
  }

  // addEducation() {
  //   this.existingEducations.forEach(edu => {
  //     this.educations.push(this.formbuilder.group({
  //       degree: [edu.degree],
  //       university: [edu.university],
  //       startDate: [edu.startdate],
  //       endDate: [edu.enddate]
  //     }));
  //   });
  // }

  // removeEducation(index: number) {
  //   this.educations.removeAt(index);
  // }

  addEducation() {
    const educationFormArray = this.profileForm.get('educations') as FormArray;
    
    // Check if educationFormArray is defined and not null
    if (educationFormArray) {
      educationFormArray.push(this.formbuilder.group({
        degree: [''], 
        university: [''],
        startDate: [''],
        endDate: ['']
      }));
    }
  }  
  removeEducation(index: number) {
    const educationFormArray = this.profileForm.get('educations') as FormArray;
    educationFormArray.removeAt(index);
  }

  addCertification() {
    const certificationFormArray = this.profileForm.get('certifications') as FormArray;
    
    // Check if certificationFormArray is defined and not null
    if (certificationFormArray) {
      certificationFormArray.push(this.formbuilder.group({
        certification: [''],
        certifiedfrom: [''],
        year: ['']
      }));
    }
  }
  removeCertification(index: number) {
    const certificationFormArray = this.profileForm.get('certifications') as FormArray;
    certificationFormArray.removeAt(index);;
  }

  addExperience() {
    const experienceFormArray = this.profileForm.get('experiences') as FormArray;
    
    // Check if experienceFormArray is defined and not null
    if (experienceFormArray) {
      experienceFormArray.push(this.formbuilder.group({
        companyname: [''],
        position: [''],
        companystartdate: [''],
        companyenddate: ['']
      }));
    }
  }
  removeExperience(index: number) {
    const experienceFormArray = this.profileForm.get('experiences') as FormArray;
    experienceFormArray.removeAt(index);
  }

  addLanguage() {
    const languageFormArray = this.profileForm.get('languages') as FormArray;
    
    // Check if languageFormArray is defined and not null
    if (languageFormArray) {
      languageFormArray.push(this.formbuilder.group({
        language: [''],
        chooselevel: ['']
      }));
    }
  }
  removeLanguage(index: number) {
    const languageFormArray = this.profileForm.get('languages') as FormArray;
    languageFormArray.removeAt(index);
  }

  submitForm() {

  }


  selectedList1: data[] = [
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList2: data[] = [
    { value: 'Advanced' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList3: data[] = [
    { value: 'Intermediate' },
    { value: 'Basic' },
    { value: 'Expert' },
  ];
  selectedList4: data[] = [
    { value: 'Intermediate' },
    { value: 'Basic' },
    { value: 'Expert' },
  ];
  selectedList5: data[] = [
    { value: 'Select' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList6: data[] = [
    { value: 'Select' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList7: data[] = [
    { value: 'Select' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList8: data[] = [
    { value: 'Select' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];
  selectedList9: data[] = [
    { value: 'Select' },
    { value: 'USA' },
    { value: 'UK' },
  ];
  custom1: data[] = [
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Expert' },
  ];

  navigation() {
    this.router.navigate([routes.freelancerprofile])
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.userService.uploadFile(this.email, file).subscribe(
        response => {
          console.log(response); // Log the response
          alert(response); // Display the response message
        },
        error => {
          console.error(error); // Handle error response
          // Optionally, you can show an error message to the user
        }
      );
    }
  }
}
