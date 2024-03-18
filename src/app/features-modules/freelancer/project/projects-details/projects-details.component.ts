import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.scss'],
})
export class ProjectsDetailsComponent implements OnInit, OnDestroy {
  public routes = routes;

  public details = [];
  loggedIn!: boolean;

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

  ngOnInit(): void {
    this.editor = new Editor();
     // Check the authentication status when the component initializes
     this.loggedIn = this.auth.isLoggedIn();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
  constructor(private router: Router, private auth: UserService) { }
  navigation() {
    this.router.navigate([routes.employee_dashboard]);
  }
  navigation1() {
    this.router.navigate([routes.freelancer_projects_proposals]);
  }

  submitProposal(): void {
    // Check if the user is logged in
    if (!this.loggedIn) {
      // If the user is not logged in, navigate to the login page
      this.router.navigate([routes.login]);
    } else {
      console.log("User is logged in, executing href...");
    }
  }
}
