import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  public password: boolean[] = [true];
  public routes = routes
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  email!:string;
  user!:User;

  constructor(private router: Router,private userService:UserService,private route:ActivatedRoute) {}

  ngOnInit() {
   this.email=this.route.snapshot.params['email']
  }

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }
  
  verifyPassword() {
    this.passwordMismatch = this.newPassword !== this.confirmPassword;
  }

  resetPassword(){
    this.userService.resetPwd(this.email,this.newPassword,this.user).subscribe((data)=>{
      console.log(data);
      alert('Password Changed Succesfully..!!!')
      this.router.navigate(['/auth/login']);
    })
  }
}
