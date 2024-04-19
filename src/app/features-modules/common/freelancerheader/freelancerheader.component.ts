/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { url } from 'src/app/core/models/models';
import { header } from 'src/app/core/models/sidebar-model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NavbarService } from 'src/app/core/services/navbar.service';

@Component({
  selector: 'app-freelancerheader',
  templateUrl: './freelancerheader.component.html',
  styleUrls: ['./freelancerheader.component.scss'],
})
export class FreelancerheaderComponent implements OnInit{
  base = '';
  page = '';
  last = '';
  public routes = routes;
  navbar: Array<header> = [];
  name!:string;
  email!:string;
  photo: any;
  error!: string;
  photoUrl: string | undefined;
  isLoading: boolean | undefined;

  constructor(
    private router: Router,
    private data: ShareDataService,
    private navservices: NavbarService,
    private common: CommonService,
    private auth:AuthService,
    private userService:UserService
  ) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(this.router);
      }
    });
    this.navbar = this.data.freelancerNavBar;
  }
  ngOnInit(): void {
    this.name=this.auth.getName();
    this.email=this.auth.getEmail();
    this.loadPhoto();
  }

  employer() {
    localStorage.setItem('employer', 'employer');
  }
  freelancer() {
    localStorage.setItem('freelancer', 'freelancer');
  }
  otherPages(val: string) {
    localStorage.setItem(val, val);
  }
  public toggleSidebar(): void {
    this.navservices.openSidebar();
  }
  public hideSidebar(): void {
    this.navservices.closeSidebar();
  }
  public anotherMenu = false;

  public getRoutes(events: url) {
    const splitVal = events.url.split('/');
    this.common.base.next(splitVal[1]);
    this.common.page.next(splitVal[2]);
    this.common.last.next(splitVal[3]);
    console.log('base', this.base);
    console.log('page', this.page);
    console.log('last', this.last);
    if (
      events.url.split('/')[2] === 'project' ||
      events.url.split('/')[2] === 'project-details' ||
      events.url.split('/')[2] === 'developer-profile'
    ) {
      this.anotherMenu = true;
    } else {
      this.anotherMenu = false;
    }
  }

  loadPhoto(): void {
    this.userService.getPhoto(this.email).subscribe(
      (data: Blob) => {
        console.log('Photo data:', data);
        const reader = new FileReader();
        reader.onload = () => {
          this.photoUrl = reader.result as string;
          console.log('Photo URL:', this.photoUrl);
          this.isLoading = false; // Set loading to false when image is loaded
        };
        reader.readAsDataURL(data);
      },
      (error: any) => {
        console.error('Error loading photo:', error);
        this.isLoading = false; // Set loading to false on error
      }
    );
  }

  logout(): void {
    this.auth.userLogout();
   }
}
