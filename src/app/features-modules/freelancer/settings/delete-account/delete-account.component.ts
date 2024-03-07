import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AccountDelete } from 'src/app/core/models/models';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
})
export class DeleteAccountComponent implements OnInit{
  passwordVisible = false;
  showModal: boolean = false;
  modalMessage1: string = '';
  modalMessage2: string = '';
  delete:AccountDelete=new AccountDelete();
  email!:string;
  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }
  constructor(
    private router: Router,
    private auth:AuthService,
    private userService:UserService) {}

  ngOnInit(): void {
    this.email=this.auth.getEmail();
  }
  navigation() {
    this.router.navigate([routes.freelancer_dashboard]);
  }
  public routes = routes;

  submitDeletion() {
    this.userService.deleteAccount(this.email, this.delete).subscribe(
      (data) => {
        console.log(data);
        // Deletion request successful
        this.showModal = true;
        this.modalMessage1 = 'Account Deletion Under Process...!!!';
        this.modalMessage2 = 'You will be informed, once admin approves your Delete Account Request';
      },
      (error) => {
        console.log(error);
        // Always show the modal for error cases
        this.showModal = true;
        if (error.status===401) {
          // Unauthorized (invalid credentials)
          this.modalMessage1 = 'Invalid Credentials';
          this.modalMessage2 = 'Please Re-Enter Password';
        } else if (error.status === 403) {
          // Forbidden (user doesn't have permission to delete account)
          this.modalMessage1 = 'Permission Denied';
          this.modalMessage2 = 'You do not have permission to delete this account';
        } else {
          // Other errors
          this.modalMessage1 = 'Error Processing Deletion';
          this.modalMessage2 = 'Please try again later';
        }
      }
    );
  }  
}
