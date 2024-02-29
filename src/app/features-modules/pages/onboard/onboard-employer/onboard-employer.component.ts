import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { routes } from 'src/app/core/helpers/routes/routes';
interface data {
  value: string;
}
@Component({
  selector: 'app-onboard-employer',
  templateUrl: './onboard-employer.component.html',
  styleUrls: ['./onboard-employer.component.scss']
})
export class OnboardEmployerComponent {

  email!: string;
  selectedRole!: string;
  constructor(private route: ActivatedRoute,private router:Router, private userService:UserService,private formbuilder:FormBuilder) { }
  user:User=new User();

  personalForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    phonenumber: new FormControl(''),
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

  employerForm:FormGroup=new FormGroup({
    ecompany:new FormControl(''),
    etagline:new FormControl(''),
    establishdate:new FormControl(''),
    ecompanyownername:new FormControl(''),
    industry:new FormControl(''),
    ewebsite:new FormControl(''),
    eteamsize:new FormControl(''),
    edescribe:new FormControl('')
  })

  ngOnInit(): void {
    this.email = this.route.snapshot.params['email'];
    console.log(this.email);
    
    this.personalForm = this.formbuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(4)]],
      lastname: ['', [Validators.required, Validators.minLength(4)]],
      phonenumber: ['', [Validators.required, Validators.minLength(10)]],
    })

    this.employerForm=this.formbuilder.group({
      ecompany: ['', [Validators.required]],
      etagline: ['', [Validators.required]],
      establishdate: ['', [Validators.required]],
      ecompanyownername: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      ewebsite: ['', [Validators.required]],
      eteamsize:  ['', [Validators.required]],
      edescribe: ['', [Validators.required]],
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
  }

  sizes = [
    { label: "It's just me", value: "Just Me" },
    { label: "2-9 employees", value: "2-9" },
    { label: "10-99 employees", value: "10-99" },
    { label: "100-1000 employees", value: "100-1000" },
    { label: "More than 1000 employees", value: "More than 1000" }
  ];

  get teamSizeControl() {
    return this.employerForm.get('eteamSize') as FormControl;
  }

  printSelectedRole(isFreelancerSelected: boolean, isEmployerSelected: boolean) {
    if (isFreelancerSelected) {
      this.selectedRole = 'Freelancer';
    } else if (isEmployerSelected) {
      this.selectedRole = 'Employer';
    }
    console.log('Selected Role:', this.selectedRole);
  }

  updateRole(){
    this.user.role=this.selectedRole;
    this.userService.insertRole(this.email,this.selectedRole).subscribe((data)=>{
      console.log(data);
    })
  }

  personalInfo() {
    this.user = this.personalForm.value;
    this.userService.personalInfo(this.user, this.email).subscribe((data) => {
      console.log(data);
    })
  }

  otherInfo(){
    console.log(this.otherInfoForm.value)
    this.user=this.otherInfoForm.value;
    this.userService.otherInfo(this.user,this.email).subscribe((data)=>{
      console.log(data);
    })
  }
  
  employerInfo(){
    console.log(this.employerForm.value)
    this.user=this.employerForm.value;
    this.userService.employerInfo(this.email,this.user).subscribe((data)=>{
      console.log(data)
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
  public datas : boolean[] = [true]
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

  onBoardFreelancer(){
    this.router.navigateByUrl(`${this.routes.freelancer_onboard}/${this.email}`)
  }
}
