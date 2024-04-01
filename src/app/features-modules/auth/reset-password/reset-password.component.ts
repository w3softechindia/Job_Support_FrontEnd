import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public password: boolean[] = [true];
  public routes = routes;
  public resetForm: FormGroup;
  public passwordMismatch = false;
  public email!: string;
  public user!: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.email = this.route.snapshot.params['email'];
  }

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }

  public resetPassword() {
    if (this.resetForm.valid) {
      this.userService.resetPwd(this.email, this.resetForm.value.newPassword, this.user).subscribe((data) => {
        console.log(data);
        alert('Password Changed Successfully..!!!');
        this.router.navigate(['/auth/login']);
      });
    }
  }

  public verifyPassword() {
    if (this.resetForm.value.newPassword !== this.resetForm.value.confirmPassword) {
      this.passwordMismatch = true;
    } else {
      this.passwordMismatch = false;
    }
  }
}
