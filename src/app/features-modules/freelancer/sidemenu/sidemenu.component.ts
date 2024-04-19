/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { SidebarData } from 'src/app/core/models/models';
import { routes } from 'src/app/core/helpers/routes/routes';
import { FreelancerSidebarItem } from 'src/app/core/models/sidebar-model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit{
  public routes = routes;
  base = '';
  page = '';
  last = '';
  currentroute = '';
  name!:string;
  email!:string;
  sidebar: SidebarData[] = [];
  photo: any;
  error!: string;
  photoUrl!: string | ArrayBuffer | null;
  userAuthenticated = false;
  constructor(private data: ShareDataService, private common: CommonService,private auth:AuthService,private userService:UserService) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
   

    this.menuItems = this.data.freelancer_sidebar;
  }
  ngOnInit(): void {
    this.name=this.auth.getName();
    this.email=this.auth.getEmail();
    this.userService.getPhoto(this.email).subscribe(
      data => {
        this.photo = data;
        this.createImageFromBlob();
      },
      error => {
        this.error = 'Failed to load photo.';
      }
    );

    this.userAuthenticated = this.userService.isLoggedIn();
  }

  public menuItems: Array<FreelancerSidebarItem> = [];
  toggleSubMenu(menuItem: FreelancerSidebarItem): void {
    menuItem.expanded = !menuItem.expanded;
  }

  logout(): void {
   this.auth.userLogout();
  }

  createImageFromBlob(): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.photoUrl = reader.result;
    }, false);

    if (this.photo) {
      reader.readAsDataURL(this.photo);
    }
  }
}
