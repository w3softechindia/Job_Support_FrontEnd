import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/core/data/share-data.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { SidebarData } from 'src/app/core/models/models';
import { routes } from 'src/app/core/helpers/routes/routes';
import { FreelancerSidebarItem } from 'src/app/core/models/sidebar-model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';

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
  constructor(private data: ShareDataService, private common: CommonService,private auth:AuthService) {
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
    this.name=this.auth.getUsername();
    this.email=this.auth.getEmail();
  }

  public menuItems: Array<FreelancerSidebarItem> = [];
  toggleSubMenu(menuItem: FreelancerSidebarItem): void {
    menuItem.expanded = !menuItem.expanded;
  }

  logout(): void {
   this.auth.userLogout();
  }
}
