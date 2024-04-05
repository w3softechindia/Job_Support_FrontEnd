/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { SidebarData } from 'src/app/core/models/models';
import { header } from 'src/app/core/models/sidebar-model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NavbarService } from 'src/app/core/services/navbar.service';

@Component({
  selector: 'app-employerheader',
  templateUrl: './employerheader.component.html',
  styleUrls: ['./employerheader.component.scss'],
})
export class EmployerheaderComponent implements OnInit{
  public routes = routes;
  base = '';
  page = '';
  last = '';
    
  sidebar: SidebarData[] = [];
  photoUrl: string | undefined;
  // Added loading indicator
  photo: any;
  error: string | undefined;
  email!: string;
  isLoading: boolean | undefined;
  navbar: Array<header> = [];
  username: any;


  constructor(
    private data: ShareDataService,
    private navservices: NavbarService,
    private common: CommonService,
    private userService:UserService,
    private auth:AuthService,
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
    this.navbar = this.data.employerNavBar;
  }

  employer() {
    localStorage.setItem('employer', 'employer');
  }
  freelancer() {
    localStorage.setItem('freelancer', 'freelancer');
  }
  setLocalStorage(value: string): void {
    localStorage.setItem(value, value);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getRoutes(events: any) {
    const splitVal = events.url.split('/');
    this.common.base.next(splitVal[1]);
    this.common.page.next(splitVal[2]);
    this.common.last.next(splitVal[3]);
    console.log('base', this.base);
    console.log('page', this.page);
    console.log('last', this.last);
    if (
      events.url.split('/')[2] === 'developer' ||
      events.url.split('/')[2] === 'developer-details' ||
      events.url.split('/')[2] === 'company-profile'
    ) {
      this.anotherMenu = true;
    } else {
      this.anotherMenu = false;
    }
  }

  ngOnInit(): void {
    this.username = this.auth.getName();
    this.email = this.auth.getEmail();
    console.log('Username:', this.username);
    console.log('Email:', this.email);
    this.loadPhoto();
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

  // loadPhoto(): void {
  //   this.userService.getPhoto(this.email).subscribe(
  //     (data: Blob) => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         this.photoUrl = reader.result as string;
  //         this.isLoading = false; // Set loading to false when image is loaded
  //       };
  //       reader.readAsDataURL(data);
  //     },
  //     (error: any) => {
  //       console.error('Error loading photo:', error);
  //       this.isLoading = false; // Set loading to false on error
  //     }
  //   );
  // }

  logout(): void {
    this.auth.userLogout();
   }
 
}
