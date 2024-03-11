import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public pwd: boolean[] = [true];
  public routes = routes;
  email!: string;
  password!: string;
  newPassword!: string;
  confirmPassword!: string;
  user!: User;

  public togglePassword(index: number) {
    this.pwd[index] = !this.pwd[index];
  }
  constructor(
    private router: Router,
    private userService: UserService,
    private auth: AuthService
  ) { }
  ngOnInit(): void {
    this.email = this.auth.getEmail();
  }
  navigation() {
    this.router.navigate([routes.login]);
  }

  changePassword() {
    if (this.newPassword === this.confirmPassword) {
      console.log('Passwords match');
      this.userService.changePassword(this.email, this.password, this.newPassword, this.user).subscribe((data) => {
        console.log("Password Changed Successfull:", data)
      },error=>{
        console.log(error);
      })
    }else{
      console.log('Passwords do not match');
    }
  }
}
