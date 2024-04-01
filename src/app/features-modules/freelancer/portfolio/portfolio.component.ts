import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { UserService } from 'src/app/Services/user.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { Portfolio } from 'src/app/core/models/models';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  title!:string;
  portfolios: Portfolio[] = [];
  selectedPortfolio!: Portfolio;

  portfolioForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    link: new FormControl(''),
    photo_path: new FormControl()
  })
  email!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email = this.auth.getEmail();

    this.portfolioForm = this.formBuilder.group({
      title: ['', Validators.required],
      link: ['', Validators.required],
      photo_path: [null, Validators.required]
    });

    this.getPortfolios();
  }

  addPortfolio() {
    const formData = new FormData();
    formData.append('title', this.portfolioForm.value.title);
    formData.append('link', this.portfolioForm.value.link);
    formData.append('photo', this.portfolioForm.value.photo_path);

    this.userService.addPortfolio(this.email, formData).subscribe(
      response => {
        console.log('Portfolio added successfully:', response);
        this.router.navigate(['/freelancer/dashboards']);
      },
      error => {
        console.error('Error adding portfolio:', error);
        // Handle error, if needed
      }
    );
  }

  getPortfolioDataByTitle(){
    this.userService.getPortfolioByTitle(this.email,this.selectedPortfolio.title).subscribe((data:any)=>{
      // this.selectedPortfolio = data;
            // Populate form fields with existing data
            this.portfolioForm.patchValue({
                title: data.title,
                link: data.link,
                photo_path:data.photo_path
            });
    });
  }
  updatePortfolio() {
    if (!this.selectedPortfolio) {
      return;
    }
    const formData = new FormData();
    formData.append('title', this.portfolioForm.value.title);
    formData.append('link', this.portfolioForm.value.link);
    formData.append('photo', this.portfolioForm.value.photo_path);

    this.userService.updatePortfolio(this.email, this.selectedPortfolio.title, formData).subscribe((data) => {
      console.log("Portfolio Updated Successfully..!!!", data);
      this.router.navigate([routes.freelancer_dashboard]);
    },
      error => {
        console.error('Error Updating portfolio:', error);
        // Handle error, if needed
      });
  }

  deletePortfolio() {
    if (!this.selectedPortfolio) {
      return;
    }
    this.userService.deletePortfolio(this.email, this.selectedPortfolio.title).subscribe(() => {
      console.log("Deleted Succesfully..!!");
      this.router.navigate([routes.freelancer_dashboard]);
    },
      error => {
        console.error('Error Deleting portfolio:', error);
        // Handle error, if needed
      });
  }

  private getPortfolios() {
    this.userService.getPortfolio(this.email).subscribe((data: any) => {
      this.portfolios = data;
      this.title=data.title;
    }, (error) => {
      console.error('Error fetching portfolios:', error); // Log error if fetching fails
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.portfolioForm.patchValue({
        photo_path: file
      });
      // Check if the photo_path control exists before updating its validity
      const photoPathControl = this.portfolioForm.get('photo_path');
      if (photoPathControl) {
        photoPathControl.updateValueAndValidity();
      } else {
        console.error('photo_path control does not exist in the form.');
      }
    } else {
      console.error('No file selected.');
    }
  }

  getImageUrl(photoPath: any): string {
    return 'http://localhost:8080/' + photoPath; // Update with your actual backend image URL
  }
}
