import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Certification, Education, Experience, Language, Skills } from 'src/app/core/models/models';
import { UserDataDto } from 'src/app/dto/UserDataDto';

interface data {
  value: string;
}
@Component({
  selector: 'app-onboard-screen',
  templateUrl: './onboard-screen.component.html',
  styleUrls: ['./onboard-screen.component.scss'],
})
export class OnboardScreenComponent implements OnInit {

  email!: string;
  selectedRole!: string;
  user: User = new User();
  personalForm!: FormGroup;
  otherInfoForm!:FormGroup;

  newSkills!:Skills[];
  newEducation:Education[]=[];
  newCertificate:Certification[]=[];
  newExperience:Experience[]=[];
  newLanguage:Language[]=[];

  // personalForm: FormGroup; = new FormGroup({
  //   firstname: new FormControl(''),
  //   lastname: new FormControl(''),
  //   phonenumber: new FormControl(''),
  //   dob: new FormControl(''),
  //   jobtitle: new FormControl(''),
  //   typeofjob: new FormControl(''),
  //   description: new FormControl(''),
  // })

  // userDtoForm: FormGroup = new FormGroup({
  //   skills: new FormControl(''),
  //   level: new FormControl(''),
  //   degree: new FormControl(''),
  //   university: new FormControl(''),
  //   startdate: new FormControl(''),
  //   enddate: new FormControl(''),
  //   companyname: new FormControl(''),
  //   position: new FormControl(''),
  //   companystartdate: new FormControl(''),
  //   companyenddate: new FormControl(''),
  //   certification: new FormControl(''),
  //   certifiedfrom: new FormControl(''),
  //   year: new FormControl(''),
  //   language: new FormControl(''),
  //   chooselevel: new FormControl(''),
  // })

  // otherInfoForm:FormGroup=new FormGroup({
  //   facebook: new FormControl(''),
  //   linkedin: new FormControl(''),
  //   instagram: new FormControl(''),
  //   persnolurl: new FormControl(''),
  //   address: new FormControl(''),
  //   city: new FormControl(''),
  //   state: new FormControl(''),
  //   postcode: new FormControl(''),
  //   documenttype: new FormControl(''),
  //   documentnumber: new FormControl(''),
  // })

  constructor(private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router,
    private userService: UserService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.params['email'];
    console.log(this.email);

    this.personalForm = this.formbuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(4)]],
      lastname: ['', [Validators.required, Validators.minLength(4)]],
      phonenumber: ['', [Validators.required, Validators.minLength(10)]],
      dob: ['', [Validators.required]],
      jobtitle: ['', [Validators.required,]],
      typeofjob: ['', [Validators.required,]],
      description: ['', [Validators.required,]],
    })

    this.otherInfoForm=this.formbuilder.group({
      facebook: ['', [Validators.required]],
      linkedin: ['', [Validators.required]],
      instagram: ['', [Validators.required]],
      persnolurl: ['', [Validators.required]],
      address: ['', [Validators.required,]],
      city: ['', [Validators.required,]],
      state: ['', [Validators.required,]],
      postcode: ['', [Validators.required,]],
      documenttype: ['', [Validators.required,]],
      documentnumber: ['', [Validators.required,]],
    })

    // this.userDtoForm = this.formbuilder.group({
    //   skills: ['', [Validators.required,]],
    //   level: ['', [Validators.required,]],
    //   degree: ['', [Validators.required,]],
    //   university: ['', [Validators.required,]],
    //   startdate: ['', [Validators.required,]],
    //   enddate: ['', [Validators.required,]],
    //   companyname: ['', [Validators.required,]],
    //   position: ['', [Validators.required,]],
    //   companystartdate: ['', [Validators.required,]],
    //   companyenddate: ['', [Validators.required,]],
    //   certification: ['', [Validators.required,]],
    //   certifiedfrom: ['', [Validators.required,]],
    //   year: ['', [Validators.required,]],
    //   language: ['', [Validators.required,]],
    //   chooselevel: ['', [Validators.required,]],
    // })

    // this.userDtoForm = this.formbuilder.group({
    //   skills: this.formbuilder.array([]),
    //   education: this.formbuilder.array([]),
    //   certification: this.formbuilder.array([]),
    //   experience: this.formbuilder.array([]),
    //   language: this.formbuilder.array([]),
    // })
  }

  printSelectedRole(isFreelancerSelected: boolean, isEmployerSelected: boolean) {
    if (isFreelancerSelected) {
      this.selectedRole = 'Freelancer';
    } else if (isEmployerSelected) {
      this.selectedRole = 'Employer';
    }
    console.log('Selected Role:', this.selectedRole);
  }

  updateRole() {
    this.userService.insertRole(this.email, this.selectedRole).subscribe((data) => {
      console.log(data);
    })
  }

  personalInfo() {
    this.user = this.personalForm.value;
    this.userService.personalInfo(this.user, this.email).subscribe((data) => {
      console.log(data);
    })
  }

  skillsandExp() {
    const userData:UserDataDto={
      skills: this.newSkills,
      education: this.newEducation,
      certification: this.newCertificate,
      experience: this.newExperience,
      language: this.newLanguage
    }
    this.userService.userData(this.email, userData).subscribe((data) => {
      console.log(data);
    },
      error => {
        console.error('Error Occured:', error);
      });
  }

  otherInfo(){
    console.log(this.otherInfoForm.value)
    this.user=this.otherInfoForm.value;
    this.userService.otherInfo(this.user,this.email).subscribe((data)=>{
      console.log(data);
    })
  }

  public selectedFieldSet = [0];
  public routes = routes;
  public displayBlock = false;
  public displayNone = false;
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';
  public selectedValue6 = '';
  public selectedValue7 = '';
  public selectedValue8 = '';
  public skills: number[] = [];
  public education: number[] = [];
  public certification: number[] = [];
  public experience: number[] = [];
  public language: number[] = [];
  public datas: boolean[] = [true]
  public isCheckboxChecked = true;

  block() {
    this.displayBlock = !this.displayBlock;
  }
  none() {
    this.displayNone = !this.displayNone;
  }

  addSkills() {
    this.skills.push(1);
  }

  removeSkills(index: number) {
    this.skills.splice(index, 1);
  }
  addEducation() {
    this.education.push(1);
  }
  removeEducation(index: number) {
    this.education.splice(index, 1);
  }

  addCertification() {
    this.certification.push(1);
  }
  removeCertification(index: number) {
    this.certification.splice(index, 1);
  }

  addExperience() {
    this.experience.push(1);
  }
  removeExperience(index: number) {
    this.experience.splice(index, 1);
  }

  addLanguage() {
    this.language.push(1);
  }
  removeLanguage(index: number) {
    this.language.splice(index, 1);
  }

  removeDatas(index: number) {
    this.datas[index] = !this.datas[index];
  }
  selectedList1: data[] = [
    { value: 'Choose Level' },
    { value: 'Select' },
    { value: 'Full Time' },
    { value: 'Part Time' },
    { value: 'Hourly' },
  ];
  selectedList2: data[] = [
    { value: 'Choose Level' },
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Proficient' },
  ];
  selectedList3: data[] = [
    { value: 'Select' },
    { value: "Bachelor's degree" },
    { value: "Master's Degree" },
  ];
  selectedList4: data[] = [
    { value: 'Select' },
    { value: "Certification" },
    { value: "Award" },
  ];
  selectedList5: data[] = [
    { value: 'Select' },
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Proficient' },
  ];
  selectedList6: data[] = [
    { value: 'Choose Level' },
    { value: 'Basic' },
    { value: 'Intermediate' },
    { value: 'Proficient' },
  ];
  selectedList7: data[] = [
    { value: 'Select' },
    { value: 'US' },
    { value: 'UK' },
    { value: 'India' },
  ];
  selectedList8: data[] = [
    { value: 'Select' },
    { value: 'US' },
    { value: 'UK' },
    { value: 'India' },
  ];
  showTimePicker: Array<string> = [];

  public hoursArray1 = [0];
  public hoursArray2 = [0];
  public hoursArray3 = [0];
  public hoursArray4 = [0];
  public hoursArray5 = [0];
  public hoursArray6 = [0];
  public hoursArray7 = [0];

  startTime1 = new Date();
  startTime2 = new Date();
  startTime3 = new Date();
  startTime4 = new Date();
  startTime5 = new Date();
  startTime6 = new Date();
  startTime7 = new Date();
  endTime1 = new Date();
  endTime2 = new Date();
  endTime3 = new Date();
  endTime4 = new Date();
  endTime5 = new Date();
  endTime6 = new Date();
  endTime7 = new Date();



  toggleTimePicker(value: string): void {
    if (this.showTimePicker[0] !== value) {
      this.showTimePicker[0] = value;
    } else {
      this.showTimePicker = [];
    }
  }
  formatTime(date: Date) {
    const selectedDate: Date = new Date(date);
    return this.datePipe.transform(selectedDate, 'h:mm a');
  }

  onBoardEmployer() {
    this.router.navigateByUrl(`${this.routes.employer_onboard}/${this.email}`)
  }
}
