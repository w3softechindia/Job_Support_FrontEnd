
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
          jobtitle: this.user.jobtitle,
          typeofjob: this.user.typeofjob,
          description: this.user.description,
          facebook:this.user.facebook,
          instagram: this.user.instagram,
          linkedin: this.user.linkedin,
          persnolurl: this.user.persnolurl,
          address: this.user.address,
          city: this.user.city,
          state: this.user.state,
          postcode:this.user.postcode 
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

  private populateSkillsForm() {
    const skillsFormArray = this.profileForm.get('skills') as FormArray;
    this.existingSkills.forEach(skill => {
      skillsFormArray.push(this.formbuilder.group({
        skillName: [skill.skillName, Validators.required], // Adjust the property name as per your data structure
        level: [skill.level, Validators.required]
      }));
    });
  }

  private populateEducationsForm() {
    const educationsFormArray = this.profileForm.get('educations') as FormArray;
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
    const certificationsFormArray = this.profileForm.get('certifications') as FormArray;
    this.existingCertifications.forEach(certification => {
      certificationsFormArray.push(this.formbuilder.group({
        certification: [certification.certification, Validators.required],
        certifiedfrom: [certification.certifiedfrom, Validators.required],
        year: [certification.year, Validators.required],
      }));
    });
  }

  private populateExperiencesForm(): void {
    const experiencesFormArray = this.profileForm.get('experiences') as FormArray;
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
    const languagesFormArray = this.profileForm.get('languages') as FormArray;
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
      skillName: ['', Validators.required],
      level: ['', Validators.required]
    }));
  }
  removeSkill(index: number,skillName:string) {
    const skillsFormArray = this.profileForm.get('skills') as FormArray;
    skillsFormArray.removeAt(index);

    this.userService.deleteSkill(skillName).subscribe(()=>{
      console.log("Skill deleted Successfully");
    },error=>{
      console.log("Error deleting skill:",error);
    })
  }

  addEducation() {
    const educationsFormArray = this.profileForm.get('educations') as FormArray;
    educationsFormArray.push(this.formbuilder.group({
      degree: ['', Validators.required],
      university: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }));
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
    const freelancerData = this.profileForm.value;
    this.userService.updateFreelancer(this.email, freelancerData).subscribe((data) => {
      console.log(data);
      this.getUserDetails();
    }, error => {
      console.log(error);
    })
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
    this.router.navigate([routes.freelancer_profiles_settings])
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
