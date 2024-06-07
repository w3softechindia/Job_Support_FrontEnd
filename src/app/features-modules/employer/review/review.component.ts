import { Component, OnInit } from '@angular/core';
import { Review, UserService } from 'src/app/Services/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  userEmial!: string;

  reviews: Review[] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private auth: AuthService,
    private userservice: UserService
  ) { }

  ngOnInit(): void {
    this.userEmial = this.auth.getEmail();
    console.log('email getting in review component' + this.userEmial);
    this.getReviews();
  }


  getReviews(): void {
    this.userservice.getReviewsByEmail(this.userEmial).subscribe(
      (data) => {
        this.reviews = data;
        console.log(this.reviews);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }






}
