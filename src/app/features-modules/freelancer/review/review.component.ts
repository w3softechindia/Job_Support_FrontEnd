/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Review, UserService } from 'src/app/Services/user.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  public routes = routes;
  constructor(private router: Router,private userService:UserService,private auth:AuthService) {}
  email!:string;
  reviews!:Review[];
  ngOnInit(): void {
   this.email=this.auth.getEmail();
    this.getReviews();
  }
  navigation() {
    this.router.navigate([routes.freelancer_project]);
  }

  private getReviews(){
    this.userService.getFreelancerReviews(this.email).subscribe((data:any)=>{
      this.reviews=data;
    })
  }
}
