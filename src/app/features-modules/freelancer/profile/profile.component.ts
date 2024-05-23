/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { Education, Experience, Skills } from 'src/app/core/models/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  email!:string;
  user:User=new User();
  experience!:Experience[];
  education!:Education[];
  skills!:Skills[];
  count!:any;
  public details = [];
  public routes = routes;
  countOfOngoingProjects: any;
  addDetails(array: number[]) {
    array.push(1);
  }
  deleteDetails(array: number[], index: number) {
    this.details.splice(index, 1);
  }

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });
  constructor(private router: Router,private auth:AuthService,private userService:UserService) {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.email=this.auth.getEmail();
    this.userDetails();
    this.getCountOfCompletedProjects();
    this.getCountOfOngoingProjects();
  }

  private userDetails(){
    this.userService.getUserByMail(this.email).subscribe((data:any)=>{
      this.user=data;
      this.experience=this.user.experience;
      this.education=this.user.education;
      this.skills=this.user.skills;
      console.log(this.user)
    })
  }

  private getCountOfCompletedProjects(){
    this.userService.getCompletedProjectsByFreelancer(this.email).subscribe((data)=>{
      this.count=data;
    })
  }

  private getCountOfOngoingProjects(){
    this.userService.getCountOfOngoingProjects(this.email,'Pending').subscribe((data:any)=>{
      this.countOfOngoingProjects=data;
    })
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  
  navigation() {
    this.router.navigate([routes.employee_dashboard]);
  }
  navigation2() {
    this.router.navigate([routes.freelancer_projects_proposals]);
  }
}
