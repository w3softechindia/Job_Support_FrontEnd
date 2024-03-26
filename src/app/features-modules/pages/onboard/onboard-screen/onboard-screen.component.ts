import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { routes } from 'src/app/core/helpers/routes/routes';

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
  userDataForm!: FormGroup;
  skillsAdded = false;
  public routes = routes;

  personalForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    phonenumber: new FormControl(''),
    dob: new FormControl(''),
    jobtitle: new FormControl(''),
    typeofjob: new FormControl(''),
    description: new FormControl(''),
  })

  otherInfoForm:FormGroup=new FormGroup({
    facebook: new FormControl(''),
    linkedin: new FormControl(''),
    instagram: new FormControl(''),
    persnolurl: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    postcode: new FormControl(''),
    documenttype: new FormControl(''),
    documentnumber: new FormControl(''),
  })

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

    this.userDataForm=this.formbuilder.group({
      skills:this.formbuilder.array([this.createSkill()]),
      educations:this.formbuilder.array([this.createEducation()]),
      certifications:this.formbuilder.array([this.createCertificate()]),
      experiences:this.formbuilder.array([this.createExperience()]),
      languages:this.formbuilder.array([this.createLanguage()]),
    });

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
  }
  
  createSkill(): FormGroup {
    return this.formbuilder.group({
      skill_name: [''],
      level: ['']
    });
  }

  createEducation():FormGroup{
    return this.formbuilder.group({
      degree:[''],
      university:[''],
      startdate:[''],
      enddate:['']
    });
  }

  createCertificate():FormGroup{
    return this.formbuilder.group({
      certification:[''],
      certifiedfrom:[''],
      year:['']
    });
  }

  createExperience():FormGroup{
    return this.formbuilder.group({
      companyname:[''],
      position:[''],
      companystartdate:[''],
      companyenddate:['']
    });
  }

  createLanguage(): FormGroup {
    return this.formbuilder.group({
      language: [''],
      chooselevel: ['']
    });
  }

  get skills(): FormArray {
    return this.userDataForm.get('skills') as FormArray;
  }

  get education(): FormArray {
    return this.userDataForm.get('educations') as FormArray;
  }

  get certification(): FormArray {
    return this.userDataForm.get('certifications') as FormArray;
  }

  get experience(): FormArray {
    return this.userDataForm.get('experiences') as FormArray;
  }

  get language(): FormArray {
    return this.userDataForm.get('languages') as FormArray;
  }

  addSkills():void {
    // this.skillsAdded = true;
    this.skills.push(this.createSkill());
  }

  removeSkills(index: number): void {
    this.skills.removeAt(index);
  }

  addEducations():void{
    this.education.push(this.createEducation());
  }

  removeEducation(index:number):void{
    this.education.removeAt(index);
  }

  addCertification():void{
    this.certification.push(this.createCertificate());
  }

  removeCertification(index:number):void{
    this.certification.removeAt(index);
  }

  addExperience():void{
    this.experience.push(this.createExperience());
  }

  removeExperience(index:number):void{
    this.experience.removeAt(index);
  }

  addLanguage():void{
    this.language.push(this.createLanguage());
  }

  removeLanguage(index:number):void{
    this.language.removeAt(index);

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
    console.log(this.userDataForm.value);
    // const userdata=this.userDataForm.value;
    this.userService.userData(this.email, this.userDataForm.value).subscribe((data) => {
      console.log(data);
    });
  }

  otherInfo(){
    console.log(this.otherInfoForm.value)
    this.user=this.otherInfoForm.value;
    this.userService.otherInfo(this.user,this.email).subscribe((data)=>{
      console.log(data);
      this.router.navigate(['/auth/login']);
    })
  }

  public selectedFieldSet = [0];
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
  // public skills: number[] = [];
  // public education: number[] = [];
  // public certification: number[] = [];
  // public experience: number[] = [];
  // public language: number[] = [];
  public datas: boolean[] = [true]
  public isCheckboxChecked = true;

  block() {
    this.displayBlock = !this.displayBlock;
  }
  none() {
    this.displayNone = !this.displayNone;
  }

  

  removeDatas(index: number) {
    this.datas[index] = !this.datas[index];
  }
 
  selectedList1: data[] = [
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
  ];
  selectedList2: data[] = [
    { value: 'Select' },
    { value: 'Full Time' },
    { value: 'Part Time' },
    { value: 'Hourly' },
  ];
  selectedList3: data[] = [
    { value: 'Select' },
    { value: 'Beginner' },
    { value: 'Intermediate' },
    { value: 'Advanced' },
    { value: 'Expert' },
  ];
  selectedList4: data[] = [
    { "value": "Bachelor of Arts (BA)" },
    { "value": "Bachelor of Science (BS)" },
    { "value": "Bachelor of Engineering (BEng)" },
    { "value": "Bachelor of Technology (BTech)" },
    { "value": "Master of Arts (MA)" },
    { "value": "Master of Science (MS)" },
    { "value": "Master of Engineering (MEng)" },
    { "value": "Master of Technology (MTech)" },
  ];
  selectedList5: data[] = [
    { value: 'Select' },
    { value: 'Certificate' },
    { value: 'Award' },
  ];
  selectedList6: data[] = [
    { "value": "Beginner" },
    { "value": "Intermediate" },
    { "value": "Advanced" },
    { "value": "Fluent" },
    { "value": "Native" }
  ];
  selectedList7: data[] = [
    { value: 'Select' },
    { "value": "Aadhaar Card" },
    { "value": "PAN Card (Permanent Account Number)" },
    { "value": "Voter ID Card" },
    { "value": "Driver's License" },
    { "value": "Passport" },
    { "value": "Income Tax Return" },
    { "value": "Employee ID Card" },
    { "value": "Education Certificate" },
  ];
  showTimePicker: Array<string> = [];

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